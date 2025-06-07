import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Textarea, 
  ButtonGroup,
  Spinner,
  Divider
} from '@heroui/react';
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
      <Card className="bg-content1 border border-divider">
        <CardHeader className="flex items-center gap-2 pb-2">
          <Icon icon="solar:magic-stick-bold-duotone" className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Generate Thumbnail</h2>
        </CardHeader>
        <Divider />
        <CardBody className="space-y-6">
          {/* Text Prompt */}
          <div>
            <label className="block text-sm text-default-500 mb-2">
              Enter Your Thumbnail Prompt:
            </label>
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholderText}
                minRows={5}
                variant="bordered"
                classNames={{
                  input: "font-mono leading-relaxed",
                  inputWrapper: "bg-content2"
                }}
              />
              {!prompt && !isFocused && (
                <div 
                  className={cn(
                    "absolute top-[17px] inline-block",
                    "w-[2px] h-[1.2em] bg-default-400",
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
            <label className="block text-sm text-default-500 mb-2">
              Reference Image (Optional):
            </label>
            <ImageUploader 
              onImageSelected={handleImageSelected}
              isProcessing={isProcessing}
            />
          </div>

          {/* Quality Selection */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-default-500">Quality:</span>
              <ButtonGroup variant="bordered" size="sm">
                {['LOW', 'MEDIUM', 'HD'].map((q) => (
                  <Button
                    key={q}
                    onClick={() => setQuality(q as typeof quality)}
                    color={quality === q ? "primary" : "default"}
                    variant={quality === q ? "solid" : "bordered"}
                  >
                    {q}
                  </Button>
                ))}
              </ButtonGroup>
            </div>

            <Button
              color="primary"
              size="lg"
              onPress={handleGenerate}
              isDisabled={isProcessing || (!prompt.trim() && !referenceImage)}
              startContent={
                isProcessing ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <Icon icon="solar:magic-stick-bold-duotone" className="w-5 h-5" />
                )
              }
            >
              {isProcessing ? 'Processing...' : 'Generate Thumbnail'}
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Generated Thumbnails */}
      {generatedThumbnails.length > 0 && (
        <Card className="bg-content1 border border-divider">
          <CardHeader>
            <h3 className="text-lg font-semibold text-foreground">Generated Results</h3>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedThumbnails.map((thumbnail) => (
                <Card
                  key={thumbnail.id}
                  isPressable
                  isHoverable
                  className={cn(
                    "relative aspect-video transition-colors",
                    selectedThumbnail === thumbnail.id
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : ""
                  )}
                  onPress={() => setSelectedThumbnail(thumbnail.id)}
                >
                  <CardBody className="p-0">
                    <img
                      src={thumbnail.url}
                      alt={`Generated thumbnail ${thumbnail.id}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                      <Icon 
                        icon={selectedThumbnail === thumbnail.id ? "solar:check-circle-bold-duotone" : "solar:cursor-bold-duotone"}
                        className="w-8 h-8 text-white"
                      />
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ThumbnailGenerator;