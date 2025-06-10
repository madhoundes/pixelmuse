import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { 
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Button,
  Divider
} from '@heroui/react';
import ImageUploader from './ImageUploader';
import PromptExtractor from './PromptExtractor';
import FaceSwapControls from './FaceSwapControls';

const ReverseEngineeringPanel = ({ onPromptGenerated, onThumbnailGenerated }) => {
  const [activeTab, setActiveTab] = useState('prompt-extraction');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [extractedPrompt, setExtractedPrompt] = useState('');
  const [faceSwapResult, setFaceSwapResult] = useState(null);

  const handleImageUpload = (file) => {
    setUploadedImage(file);
  };

  const handlePromptExtracted = (prompt) => {
    setExtractedPrompt(prompt);
    onPromptGenerated?.(prompt);
  };

  const handleFaceSwapComplete = (result) => {
    setFaceSwapResult(result);
    onThumbnailGenerated?.(result);
  };

  const handleGenerateFromPrompt = () => {
    if (extractedPrompt) {
      onPromptGenerated?.(extractedPrompt);
    }
  };

  const handleSaveToTemplates = () => {
    // Implementation for saving to templates
    console.log('Saving to templates:', { prompt: extractedPrompt, image: uploadedImage });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon icon="solar:magic-stick-bold-duotone" className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold">Thumbnail Reverse Engineering</h2>
          </div>
          <p className="text-sm text-default-500 mt-1">
            Upload an existing thumbnail to extract prompts or perform face swaps
          </p>
        </CardHeader>
        <Divider />
        <CardBody>
          <ImageUploader
            onImageUpload={handleImageUpload}
            title="Upload thumbnail to analyze"
            description="Upload any YouTube thumbnail to reverse engineer"
          />
        </CardBody>
      </Card>

      {uploadedImage && (
        <Card>
          <CardBody className="p-0">
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={setActiveTab}
              variant="underlined"
              classNames={{
                tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-primary",
                tab: "max-w-fit px-4 h-12",
                tabContent: "group-data-[selected=true]:text-primary"
              }}
            >
              <Tab
                key="prompt-extraction"
                title={
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:document-text-bold-duotone" className="w-4 h-4" />
                    <span>Extract Prompt</span>
                  </div>
                }
              >
                <div className="p-6">
                  <PromptExtractor
                    imageFile={uploadedImage}
                    onPromptGenerated={handlePromptExtracted}
                  />
                </div>
              </Tab>
              
              <Tab
                key="face-swap"
                title={
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:face-scan-circle-bold-duotone" className="w-4 h-4" />
                    <span>Face Swap</span>
                  </div>
                }
              >
                <div className="p-6">
                  <FaceSwapControls
                    originalImage={uploadedImage}
                    onFaceSwapComplete={handleFaceSwapComplete}
                  />
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      )}

      {/* Action Buttons */}
      {(extractedPrompt || faceSwapResult) && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {extractedPrompt && (
                <Button
                  color="primary"
                  variant="solid"
                  onPress={handleGenerateFromPrompt}
                  startContent={<Icon icon="solar:magic-stick-bold-duotone" className="w-4 h-4" />}
                >
                  Generate New Thumbnail
                </Button>
              )}
              
              {faceSwapResult && (
                <Button
                  color="secondary"
                  variant="bordered"
                  onPress={() => setActiveTab('face-swap')}
                  startContent={<Icon icon="solar:refresh-bold-duotone" className="w-4 h-4" />}
                >
                  Try Another Face
                </Button>
              )}
              
              <Button
                color="success"
                variant="bordered"
                onPress={handleSaveToTemplates}
                startContent={<Icon icon="solar:bookmark-bold-duotone" className="w-4 h-4" />}
              >
                Save to Templates
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ReverseEngineeringPanel;