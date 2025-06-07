import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '../utils/cn';

type QualityOption = 'low' | 'medium' | 'hd';

const PreviewPanel: React.FC = () => {
  const [quality, setQuality] = useState<QualityOption>('medium');

  return (
    <div className="card overflow-visible">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="font-medium flex items-center">
          <Icon icon="solar:eye-bold-duotone" className="text-blue-500 mr-2 h-5 w-5" />
          Preview Panel
        </h2>
        
        <button className="btn btn-secondary text-sm py-1 px-3 flex items-center">
          <Icon icon="solar:refresh-bold-duotone" className="mr-1.5 h-4 w-4" />
          Reset
        </button>
      </div>
      
      <div className="p-4">
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden relative group">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center p-6">
            <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center">
              <div className="text-center">
                <Icon icon="solar:mountains-bold-duotone" className="h-10 w-10 text-gray-500 mx-auto" />
                <div className="mt-1 text-xs text-gray-400">
                  Your Thumbnail Preview here
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button className="btn btn-primary text-sm py-1.5 flex items-center">
              <Icon icon="solar:refresh-bold-duotone" className="mr-1.5 h-4 w-4" />
              Regenerate
            </button>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Icon icon="solar:settings-bold-duotone" className="text-blue-500 mr-2 h-5 w-5" />
              <label className="text-sm font-medium">Quality</label>
            </div>
            <div className="relative group">
              <button className="text-gray-400 hover:text-blue-400">
                <Icon icon="solar:info-circle-bold-duotone" className="h-5 w-5" />
              </button>
              <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-gray-800 rounded shadow-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Higher quality takes longer to generate but produces better results
              </div>
            </div>
          </div>
          
          <div className="flex bg-gray-900 rounded-lg p-1">
            <QualityButton 
              label="Low" 
              isActive={quality === 'low'} 
              onClick={() => setQuality('low')} 
            />
            <QualityButton 
              label="Medium" 
              isActive={quality === 'medium'} 
              onClick={() => setQuality('medium')} 
            />
            <QualityButton 
              label="HD" 
              isActive={quality === 'hd'} 
              onClick={() => setQuality('hd')} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface QualityButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const QualityButton: React.FC<QualityButtonProps> = ({ 
  label, isActive, onClick 
}) => {
  return (
    <button
      className={cn(
        "flex-1 py-2 px-4 rounded text-sm font-medium transition-all duration-200",
        isActive 
          ? "bg-blue-600 text-white shadow-lg" 
          : "text-gray-400 hover:text-white hover:bg-gray-800"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PreviewPanel;