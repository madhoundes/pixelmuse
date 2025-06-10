// Mock image analysis utility - replace with actual AI service integration
export const analyzeImage = async (imageFile) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock analysis result based on image characteristics
  const mockAnalysis = {
    subject: {
      type: 'person',
      description: 'excited person with surprised expression',
      position: 'center',
      expression: 'surprised'
    },
    background: {
      style: 'cinematic',
      colors: ['blue', 'purple', 'orange'],
      effects: ['gradient', 'glow']
    },
    text: {
      content: 'AMAZING RESULTS!',
      style: 'bold',
      position: 'top',
      effects: ['glow', 'shadow', 'outline']
    },
    composition: {
      layout: 'centered',
      mood: 'energetic',
      lighting: 'dramatic'
    }
  };

  return mockAnalysis;
};

export const generatePrompt = (analysis) => {
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
    if (analysis.background.effects?.length > 0) {
      parts.push(`and ${analysis.background.effects.join(', ')} effects`);
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

// Image preprocessing utilities
export const resizeImage = (file, maxWidth = 2048) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(resolve, 'image/webp', 0.8);
    };

    img.src = URL.createObjectURL(file);
  });
};

export const detectFaces = async (imageFile) => {
  // Mock face detection - replace with actual face detection service
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    faceCount: 1,
    faces: [
      {
        x: 0.3,
        y: 0.2,
        width: 0.4,
        height: 0.6,
        confidence: 0.95
      }
    ]
  };
};