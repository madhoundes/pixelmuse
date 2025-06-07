import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '../utils/cn';
import ImageUploader from './ImageUploader';
import { useTypewriterSuggestions } from '../utils/typewriterSuggestions';

interface GeneratedThumbnail {
  id: string;
  url: string;
  timestamp: string;
}

const ThumbnailGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [quality, setQuality] = useState<'LOW' | 'MEDIUM' | 'HD'>('MEDIUM');
  const [isFocused, setIsFocused] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedThumbnails, setGeneratedThumbnails] = useState<GeneratedThumbnail[]>([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  
  const { text: placeholderText, showCursor, isTyping } = useTypewriterSuggestions(!prompt && !isFocused);

  const handleImageSelected = async (file: File | string) => {
    setIsProcessing(true);
    setSelectedThumbnail(null);

    try {
      // Here you would typically:
      // 1. Upload the image to your backend
      // 2. Process it through your image generation service
      // 3. Receive the generated variations
      
      const imageUrl = typeof file === 'string' ? file : URL.createObjectURL(file);
      setReferenceImage(imageUrl);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate generated thumbnails
      const newThumbnails: GeneratedThumbnail[] = [
        {
          id: Date.now().toString(),
          url: imageUrl,
          timestamp: new Date().toISOString()
        }
      ];

      setGeneratedThumbnails(newThumbnails);
      setSelectedThumbnail(newThumbnails[0].id);
    } catch (error) {
      console.error('Error generating thumbnails:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !referenceImage) return;
    
    setIsProcessing(true);
    setSelectedThumbnail(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate generated thumbnails
      const newThumbnails: GeneratedThumbnail[] = [
        {
          id: Date.now().toString(),
          url: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1280',
          timestamp: new Date().toISOString()
        }
      ];

      setGeneratedThumbnails(newThumbnails);
      setSelectedThumbnail(newThumbnails[0].id);
    } catch (error) {
      console.error('Error generating thumbnails:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#151823] rounded-2xl p-6 border border-gray-800/50">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Icon icon="solar:magic-stick-bold-duotone" className="w-6 h-6 text-blue-500" />
          Generate Thumbnail
        </h2>

        <div className="space-y-6">
          {/* Text Prompt */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Enter Your Thumbnail Prompt:
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholderText}
                className={cn(
                  "w-full h-[120px] bg-[#1C1F2E] rounded-xl p-4",
                  "text-gray-200 font-mono leading-relaxed",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                  "transition-all duration-200",
                  "placeholder:text-gray-500"
                )}
              />
              {!prompt && !isFocused && (
                <div 
                  className={cn(
                    "absolute top-[17px] inline-block",
                    "w-[2px] h-[1.2em] bg-gray-400",
                    "transition-all duration-75",
                    showCursor ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    left: `calc(${placeholderText.length}ch + 1rem)`,
                    transform: 'translateY(-1px)'
                  }}
                />
              )}
            </div>
          </div>

          {/* Reference Image */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Reference Image (Optional):
            </label>
            <ImageUploader 
              onImageSelected={handleImageSelected}
              isProcessing={isProcessing}
            />
          </div>

          {/* Quality Selection */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Quality:</span>
              <div className="flex bg-[#1C1F2E] rounded-lg p-1">
                {['LOW', 'MEDIUM', 'HD'].map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuality(q as typeof quality)}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                      quality === q ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"
                    )}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isProcessing || (!prompt.trim() && !referenceImage)}
              className={cn(
                "px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors",
                "bg-blue-500 hover:bg-blue-600 text-white",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isProcessing ? (
                <>
                  <Icon icon="solar:refresh-circle-bold-duotone\" className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Icon icon="solar:magic-stick-bold-duotone" className="w-5 h-5" />
                  Generate Thumbnail
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Thumbnails */}
      {generatedThumbnails.length > 0 && (
        <div className="bg-[#151823] rounded-2xl p-6 border border-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedThumbnails.map((thumbnail) => (
              <div
                key={thumbnail.id}
                className={cn(
                  "relative aspect-video rounded-xl overflow-hidden cursor-pointer group",
                  "border-2 transition-colors",
                  selectedThumbnail === thumbnail.id
                    ? "border-blue-500"
                    : "border-transparent hover:border-gray-700"
                )}
                onClick={() => setSelectedThumbnail(thumbnail.id)}
              >
                <img
                  src={thumbnail.url}
                  alt={`Generated thumbnail ${thumbnail.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Icon 
                    icon={selectedThumbnail === thumbnail.id ? "solar:check-circle-bold-duotone" : "solar:cursor-bold-duotone"}
                    className="w-8 h-8 text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailGenerator;