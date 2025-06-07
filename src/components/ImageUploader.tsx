import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
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
      <div className="bg-[#1C1F2E] rounded-xl p-1.5 flex gap-1.5">
        <button
          onClick={() => setUploadMethod('upload')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-all",
            uploadMethod === 'upload'
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
              : "text-gray-400 hover:text-white"
          )}
        >
          <Icon icon="solar:upload-linear" className="w-5 h-5" />
          Upload
        </button>
        <button
          onClick={() => setUploadMethod('url')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-all",
            uploadMethod === 'url'
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
              : "text-gray-400 hover:text-white"
          )}
        >
          <Icon icon="solar:link-circle-linear" className="w-5 h-5" />
          URL
        </button>
      </div>

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
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Paste image URL here..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={isProcessing}
              className={cn(
                "w-full bg-[#1C1F2E] h-[53px] px-4 rounded-xl",
                "text-white placeholder-gray-500 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            />
            <button
              onClick={handleUrlSubmit}
              disabled={isProcessing || !imageUrl.trim()}
              className={cn(
                "w-full py-3 rounded-xl font-medium transition-colors",
                "bg-blue-500 hover:bg-blue-600 text-white",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center justify-center gap-2"
              )}
            >
              {isProcessing ? (
                <>
                  <Icon icon="solar:refresh-circle-bold-duotone\" className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Icon icon="solar:check-circle-bold-duotone" className="w-5 h-5" />
                  Use Image
                </>
              )}
            </button>
          </div>
        ) : (
          <button
            onClick={handleUploadClick}
            disabled={isProcessing}
            className={cn(
              "w-full h-[120px] border-2 border-dashed border-gray-700 rounded-xl",
              "flex flex-col items-center justify-center gap-3",
              "hover:bg-[#1C1F2E] transition-colors group",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isProcessing ? (
              <>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Icon icon="solar:refresh-circle-bold-duotone\" className="w-6 h-6 text-blue-500 animate-spin" />
                </div>
                <span className="text-sm text-gray-400">Processing image...</span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                  <Icon icon="solar:upload-linear" className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div className="text-center">
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    Click to upload image
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG or WebP (max. 5MB)
                  </p>
                </div>
              </>
            )}
          </button>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-2 text-sm text-red-400 flex items-center gap-1.5">
            <Icon icon="solar:danger-triangle-bold-duotone" className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;