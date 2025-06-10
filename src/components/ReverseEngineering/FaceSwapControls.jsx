import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { 
  Card,
  CardBody,
  CardHeader,
  Button,
  Slider,
  Switch,
  Divider,
  Spinner,
  Progress
} from '@heroui/react';
import ImageUploader from './ImageUploader';
import { useFaceSwap } from '../../hooks/useFaceSwap';

const FaceSwapControls = ({ originalImage, onFaceSwapComplete }) => {
  const [newFaceImage, setNewFaceImage] = useState(null);
  const [options, setOptions] = useState({
    autoMatchSkinTone: true,
    preserveOriginalLighting: true,
    expressionMatching: false,
    blendStrength: 85,
    edgeSmoothing: true
  });

  const { performFaceSwap, isProcessing, result, error, progress } = useFaceSwap();

  const handleFaceSwap = async () => {
    if (!originalImage || !newFaceImage) return;
    
    const swapResult = await performFaceSwap(originalImage, newFaceImage, options);
    if (swapResult) {
      onFaceSwapComplete?.(swapResult);
    }
  };

  const handleOptionChange = (key, value) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <h4 className="text-sm font-medium">Original Thumbnail</h4>
          </CardHeader>
          <Divider />
          <CardBody>
            {originalImage ? (
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={typeof originalImage === 'string' ? originalImage : URL.createObjectURL(originalImage)}
                  alt="Original thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video bg-content2 rounded-lg flex items-center justify-center">
                <span className="text-sm text-default-400">No image uploaded</span>
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <h4 className="text-sm font-medium">New Face Photo</h4>
          </CardHeader>
          <Divider />
          <CardBody>
            <ImageUploader
              onImageUpload={setNewFaceImage}
              uploadType="face"
              title="Drop face photo here"
              description="Clear face photo for best results"
            />
          </CardBody>
        </Card>
      </div>

      {/* Processing Options */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon icon="solar:settings-bold-duotone" className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Face Swap Options</h3>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="space-y-6">
          {/* Toggle Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Auto-match skin tone</p>
                <p className="text-xs text-default-400">Automatically adjust skin tone to match original</p>
              </div>
              <Switch
                isSelected={options.autoMatchSkinTone}
                onValueChange={(value) => handleOptionChange('autoMatchSkinTone', value)}
                color="primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Preserve original lighting</p>
                <p className="text-xs text-default-400">Keep the lighting from the original thumbnail</p>
              </div>
              <Switch
                isSelected={options.preserveOriginalLighting}
                onValueChange={(value) => handleOptionChange('preserveOriginalLighting', value)}
                color="primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Expression matching</p>
                <p className="text-xs text-default-400">Try to match facial expression</p>
              </div>
              <Switch
                isSelected={options.expressionMatching}
                onValueChange={(value) => handleOptionChange('expressionMatching', value)}
                color="secondary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Edge smoothing</p>
                <p className="text-xs text-default-400">Smooth edges for natural blending</p>
              </div>
              <Switch
                isSelected={options.edgeSmoothing}
                onValueChange={(value) => handleOptionChange('edgeSmoothing', value)}
                color="success"
              />
            </div>
          </div>

          {/* Blend Strength Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Blend Strength</p>
              <span className="text-xs text-default-400">{options.blendStrength}%</span>
            </div>
            <Slider
              size="sm"
              step={5}
              minValue={0}
              maxValue={100}
              value={options.blendStrength}
              onChange={(value) => handleOptionChange('blendStrength', value)}
              color="primary"
              className="max-w-full"
            />
          </div>

          {/* Processing Status */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Spinner size="sm" color="secondary" />
                <span className="text-sm">Processing face swap...</span>
              </div>
              <Progress 
                value={progress} 
                color="secondary" 
                size="sm"
                showValueLabel
              />
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-danger/10 border border-danger/20 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Icon icon="solar:danger-triangle-bold-duotone" className="w-4 h-4 text-danger" />
                <span className="text-sm text-danger">{error}</span>
              </div>
            </div>
          )}

          {/* Action Button */}
          <Button
            color="primary"
            size="lg"
            onPress={handleFaceSwap}
            isDisabled={!originalImage || !newFaceImage || isProcessing}
            startContent={
              isProcessing ? (
                <Spinner size="sm" color="white" />
              ) : (
                <Icon icon="solar:face-scan-circle-bold-duotone" className="w-5 h-5" />
              )
            }
            className="w-full"
          >
            {isProcessing ? 'Processing...' : 'Perform Face Swap'}
          </Button>
        </CardBody>
      </Card>

      {/* Result Preview */}
      {result && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Icon icon="solar:check-circle-bold-duotone" className="w-5 h-5 text-success" />
              <h3 className="text-lg font-semibold">Face Swap Result</h3>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
              <img
                src={result}
                alt="Face swap result"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              <Button
                color="success"
                variant="solid"
                startContent={<Icon icon="solar:download-bold-duotone" className="w-4 h-4" />}
                className="flex-1"
              >
                Download Result
              </Button>
              <Button
                color="secondary"
                variant="bordered"
                startContent={<Icon icon="solar:refresh-bold-duotone" className="w-4 h-4" />}
                onPress={() => setNewFaceImage(null)}
                className="flex-1"
              >
                Try Another Face
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default FaceSwapControls;