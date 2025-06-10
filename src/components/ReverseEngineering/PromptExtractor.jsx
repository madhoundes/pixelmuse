import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { 
  Card,
  CardBody,
  CardHeader,
  Textarea,
  Button,
  Chip,
  Divider,
  Spinner
} from '@heroui/react';
import { useImageAnalysis } from '../../hooks/useImageAnalysis';

const PromptExtractor = ({ imageFile, onPromptGenerated }) => {
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const { analyzeImage, isAnalyzing, analysisResult, error } = useImageAnalysis();

  useEffect(() => {
    if (imageFile) {
      analyzeImage(imageFile);
    }
  }, [imageFile, analyzeImage]);

  useEffect(() => {
    if (analysisResult) {
      const prompt = generatePromptFromAnalysis(analysisResult);
      setGeneratedPrompt(prompt);
      onPromptGenerated?.(prompt);
    }
  }, [analysisResult, onPromptGenerated]);

  const generatePromptFromAnalysis = (analysis) => {
    if (!analysis) return '';

    const parts = [];

    // Subject description
    if (analysis.subject) {
      parts.push(`Create a ${analysis.composition?.mood || 'dynamic'} YouTube thumbnail featuring ${analysis.subject.description}`);
      if (analysis.subject.position) {
        parts.push(`positioned ${analysis.subject.position}`);
      }
    }

    // Background details
    if (analysis.background) {
      parts.push(`Use a ${analysis.background.style} background`);
      if (analysis.background.colors?.length > 0) {
        parts.push(`with ${analysis.background.colors.join(', ')} colors`);
      }
    }

    // Text overlay
    if (analysis.text?.content) {
      parts.push(`Add ${analysis.text.style || 'bold'} text saying "${analysis.text.content}"`);
      if (analysis.text.effects?.length > 0) {
        parts.push(`with ${analysis.text.effects.join(', ')} effects`);
      }
    }

    // Composition and lighting
    if (analysis.composition) {
      if (analysis.composition.lighting) {
        parts.push(`Apply ${analysis.composition.lighting} lighting`);
      }
      if (analysis.composition.layout) {
        parts.push(`for a ${analysis.composition.layout} composition`);
      }
    }

    return parts.join('. ') + '.';
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePromptEdit = (value) => {
    setGeneratedPrompt(value);
    onPromptGenerated?.(value);
  };

  if (isAnalyzing) {
    return (
      <Card>
        <CardBody className="flex flex-col items-center justify-center py-12">
          <Spinner size="lg" color="secondary" />
          <p className="text-sm text-default-500 mt-4">Analyzing thumbnail...</p>
          <p className="text-xs text-default-400 mt-1">
            Extracting composition, colors, and text elements
          </p>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-danger/20">
        <CardBody className="text-center py-8">
          <Icon icon="solar:danger-triangle-bold-duotone" className="w-12 h-12 text-danger mx-auto mb-4" />
          <h3 className="text-lg font-medium text-danger mb-2">Analysis Failed</h3>
          <p className="text-sm text-default-500">{error}</p>
          <Button 
            color="danger" 
            variant="flat" 
            size="sm"
            className="mt-4"
            onPress={() => window.location.reload()}
          >
            Try Again
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Icon icon="solar:magic-stick-bold-duotone" className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-semibold">Generated Prompt</h3>
          </div>
          {analysisResult && (
            <Chip size="sm" color="success" variant="flat">
              Analysis Complete
            </Chip>
          )}
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="space-y-4">
        {analysisResult && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <Chip size="sm" variant="flat" color="primary">
              {analysisResult.subject?.type || 'Unknown'}
            </Chip>
            <Chip size="sm" variant="flat" color="secondary">
              {analysisResult.background?.style || 'Style'}
            </Chip>
            <Chip size="sm" variant="flat" color="warning">
              {analysisResult.composition?.mood || 'Mood'}
            </Chip>
            <Chip size="sm" variant="flat" color="success">
              {analysisResult.composition?.layout || 'Layout'}
            </Chip>
          </div>
        )}

        <Textarea
          value={generatedPrompt}
          onChange={(e) => handlePromptEdit(e.target.value)}
          placeholder="Generated prompt will appear here..."
          minRows={6}
          maxRows={10}
          variant="bordered"
          classNames={{
            input: "font-mono text-sm leading-relaxed",
            inputWrapper: "bg-content2"
          }}
        />

        <div className="flex gap-2">
          <Button
            color="primary"
            variant="solid"
            onPress={copyToClipboard}
            startContent={
              <Icon 
                icon={copied ? "solar:check-circle-bold-duotone" : "solar:copy-bold-duotone"} 
                className="w-4 h-4" 
              />
            }
            className="flex-1"
          >
            {copied ? 'Copied!' : 'Copy Prompt'}
          </Button>
          <Button
            color="secondary"
            variant="bordered"
            onPress={() => onPromptGenerated?.(generatedPrompt)}
            startContent={<Icon icon="solar:magic-stick-bold-duotone" className="w-4 h-4" />}
            className="flex-1"
          >
            Generate New Thumbnail
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default PromptExtractor;