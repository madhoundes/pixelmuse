import React from 'react';
import ThumbnailGenerator from './ThumbnailGenerator';

const EditorPanel: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <ThumbnailGenerator />
    </div>
  );
};

export default EditorPanel;