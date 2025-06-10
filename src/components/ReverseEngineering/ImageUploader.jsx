import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { 
  Card,
  CardBody,
  Button,
  Spinner,
  Progress
} from '@heroui/react';
import { cn } from '../../utils/cn';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isProcessing?: boolean;
  uploadType?: 'thumbnail' | 'face';
  title?: string;
  description?: string;
}

const ImageUploader = ({ 
  onImageUpload, 
  isProcessing = false, 
  uploadType = 'thumbnail',
  title,
  description 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setError(null);

    // Validate file type
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      setError('Please upload a JPG, PNG, or WebP image');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size should be less than 10MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    onImageUpload(file);
  };

  const handleClick = () => {
    if (!isProcessing) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleChange}
        disabled={isProcessing}
      />

      <Card 
        isPressable={!isProcessing}
        isHoverable={!isProcessing}
        onPress={handleClick}
        className={cn(
          "w-full h-[200px] border-2 border-dashed transition-all duration-200",
          dragActive ? "border-purple-500 bg-purple-500/10" : "border-gray-600",
          !isProcessing && "hover:border-purple-500 hover:bg-gray-800/50",
          isProcessing && "opacity-50 cursor-not-allowed"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardBody className="flex flex-col items-center justify-center gap-4 p-6">
          {preview && !isProcessing ? (
            <div className="relative w-full h-full">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <Icon icon="solar:refresh-circle-linear" className="w-8 h-8 text-white" />
              </div>
            </div>
          ) : isProcessing ? (
            <>
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Spinner size="lg" color="secondary" />
              </div>
              <div className="text-center">
                <span className="text-sm text-foreground">Processing image...</span>
                <Progress 
                  size="sm" 
                  isIndeterminate 
                  color="secondary"
                  className="mt-2 w-32"
                />
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-content3 flex items-center justify-center">
                <Icon 
                  icon="solar:camera-add-bold-duotone" 
                  className="w-8 h-8 text-default-500" 
                />
              </div>
              <div className="text-center">
                <span className="text-sm text-foreground font-medium">
                  {title || `Drop ${uploadType} image here`}
                </span>
                <p className="text-xs text-default-400 mt-1">
                  {description || "JPG, PNG or WebP (max. 10MB)"}
                </p>
                <Button 
                  size="sm" 
                  variant="flat" 
                  color="primary"
                  className="mt-2"
                >
                  Browse Files
                </Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>

      {error && (
        <div className="text-sm text-danger flex items-center gap-1.5">
          <Icon icon="solar:danger-triangle-bold-duotone" className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;