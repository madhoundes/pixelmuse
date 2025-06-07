import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { 
  Button,
  ButtonGroup,
  Input,
  Spinner,
  Card,
  CardBody
} from '@heroui/react';
import { cn } from '../utils/cn';

interface ImageUploaderProps {
  onImageSelected: (file: File | string) => void;
  isProcessing?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, isProcessing = false }) => {
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (file) {
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
        setError('Please upload a JPG, PNG, or WebP image');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      onImageSelected(file);
    }
  };

  const handleUrlSubmit = () => {
    setError(null);

    if (!imageUrl.trim()) {
      setError('Please enter an image URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(imageUrl);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    onImageSelected(imageUrl);
  };

  const handleUploadClick = () => {
    if (!isProcessing) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Method Toggle */}
      <ButtonGroup variant="bordered" className="w-full">
        <Button
          onPress={() => setUploadMethod('upload')}
          color={uploadMethod === 'upload' ? "primary" : "default"}
          variant={uploadMethod === 'upload' ? "solid" : "bordered"}
          startContent={<Icon icon="solar:upload-linear" className="w-5 h-5" />}
          className="flex-1"
        >
          Upload
        </Button>
        <Button
          onPress={() => setUploadMethod('url')}
          color={uploadMethod === 'url' ? "primary" : "default"}
          variant={uploadMethod === 'url' ? "solid" : "bordered"}
          startContent={<Icon icon="solar:link-circle-linear" className="w-5 h-5" />}
          className="flex-1"
        >
          URL
        </Button>
      </ButtonGroup>

      {/* Upload Area */}
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileUpload}
          disabled={isProcessing}
        />

        {uploadMethod === 'url' ? (
          <div className="space-y-3">
            <Input
              type="url"
              placeholder="Paste image URL here..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              isDisabled={isProcessing}
              variant="bordered"
              classNames={{
                inputWrapper: "bg-content2"
              }}
            />
            <Button
              onPress={handleUrlSubmit}
              isDisabled={isProcessing || !imageUrl.trim()}
              color="primary"
              size="lg"
              className="w-full"
              startContent={
                isProcessing ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <Icon icon="solar:check-circle-bold-duotone" className="w-5 h-5" />
                )
              }
            >
              {isProcessing ? 'Processing...' : 'Use Image'}
            </Button>
          </div>
        ) : (
          <Card 
            isPressable={!isProcessing}
            isHoverable={!isProcessing}
            onPress={handleUploadClick}
            className={cn(
              "w-full h-[120px] border-2 border-dashed border-divider",
              "bg-content2/50 hover:bg-content2",
              isProcessing && "opacity-50 cursor-not-allowed"
            )}
          >
            <CardBody className="flex flex-col items-center justify-center gap-3">
              {isProcessing ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Spinner size="md" color="primary" />
                  </div>
                  <span className="text-sm text-default-500">Processing image...</span>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-content3 flex items-center justify-center">
                    <Icon icon="solar:upload-linear" className="w-6 h-6 text-default-500" />
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-foreground">
                      Click to upload image
                    </span>
                    <p className="text-xs text-default-400 mt-1">
                      JPG, PNG or WebP (max. 5MB)
                    </p>
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-2 text-sm text-danger flex items-center gap-1.5">
            <Icon icon="solar:danger-triangle-bold-duotone" className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;