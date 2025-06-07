import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Tab } from '@headlessui/react';
import { cn } from '../utils/cn';

const FeaturesSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'tools' | 'presets'>('tools');

  return (
    <div className="w-[320px] flex-shrink-0 card overflow-hidden flex flex-col">
      <Tab.Group>
        <Tab.List className="border-b border-gray-700 flex">
          <TabButton 
            icon="solar:history-bold-duotone" 
            label="History" 
            isActive={activeTab === 'history'} 
            onClick={() => setActiveTab('history')} 
          />
          <TabButton 
            icon="solar:magic-stick-bold-duotone" 
            label="Tools" 
            isActive={activeTab === 'tools'} 
            onClick={() => setActiveTab('tools')} 
          />
          <TabButton 
            icon="solar:star-bold-duotone" 
            label="Presets" 
            isActive={activeTab === 'presets'} 
            onClick={() => setActiveTab('presets')} 
          />
        </Tab.List>
        
        <Tab.Panels className="flex-1 overflow-auto">
          <Tab.Panel className="p-4 h-full">
            <HistoryPanel />
          </Tab.Panel>
          <Tab.Panel className="p-4 h-full">
            <ToolsPanel />
          </Tab.Panel>
          <Tab.Panel className="p-4 h-full">
            <PresetsPanel />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      
      <div className="p-4 border-t border-gray-700 bg-gray-900/50">
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="flex gap-2">
            <QuickActionButton
              icon="solar:magic-stick-bold-duotone"
              label="Auto Enhance"
              onClick={() => {}}
            />
            <QuickActionButton
              icon="solar:restart-bold-duotone"
              label="Reset All"
              onClick={() => {}}
            />
          </div>
          
          {/* AI Assistant */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Icon icon="solar:robot-bold-duotone" className="h-6 w-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-blue-400">AI Assistant</h3>
                <p className="text-xs text-gray-400 mt-1 mb-3">Get help with prompts and image generation</p>
                <button className="text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-1.5 px-3 rounded-lg transition-colors">
                  Ask Assistant
                </button>
              </div>
            </div>
          </div>
          
          {/* Image Stats */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-xs font-medium text-gray-400 mb-2">Image Statistics</h3>
            <div className="grid grid-cols-2 gap-2">
              <StatItem label="Resolution" value="1024x1024" />
              <StatItem label="File Size" value="2.4 MB" />
              <StatItem label="Format" value="PNG" />
              <StatItem label="Created" value="Just now" />
            </div>
          </div>
          
          {/* Share Options */}
          <div className="flex gap-2">
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 rounded-lg p-2 text-sm text-center transition-colors">
              <Icon icon="solar:share-bold-duotone" className="h-5 w-5 mx-auto mb-1 text-blue-400" />
              <span className="text-xs">Share</span>
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 rounded-lg p-2 text-sm text-center transition-colors">
              <Icon icon="solar:gallery-export-bold-duotone" className="h-5 w-5 mx-auto mb-1 text-purple-400" />
              <span className="text-xs">Export</span>
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 rounded-lg p-2 text-sm text-center transition-colors">
              <Icon icon="solar:cloud-upload-bold-duotone" className="h-5 w-5 mx-auto mb-1 text-green-400" />
              <span className="text-xs">Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuickActionButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex-1 bg-gray-800 hover:bg-gray-700 rounded-lg py-2 px-3 text-sm flex items-center justify-center gap-2 transition-colors"
    >
      <Icon icon={icon} className="h-4 w-4" />
      <span className="text-xs">{label}</span>
    </button>
  );
};

interface StatItemProps {
  label: string;
  value: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-2">
      <div className="text-[10px] text-gray-500">{label}</div>
      <div className="text-xs font-medium text-gray-300">{value}</div>
    </div>
  );
};

interface TabButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ 
  icon, label, isActive, onClick 
}) => {
  return (
    <Tab
      className={({ selected }) => cn(
        "flex-1 py-3 flex flex-col items-center justify-center text-xs font-medium transition-colors outline-none",
        selected
          ? "text-blue-500 border-b-2 border-blue-500" 
          : "text-gray-400 hover:text-gray-200"
      )}
    >
      <Icon icon={icon} className="h-5 w-5 mb-1" />
      {label}
    </Tab>
  );
};

const HistoryPanel: React.FC = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Generations</h3>
      
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-gray-900 rounded-lg p-2 hover:bg-gray-800 transition-colors cursor-pointer group">
          <div className="flex gap-3">
            <div className="w-16 h-16 rounded-md bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-300 truncate mb-1">
                A futuristic cityscape with neon lights and flying cars
              </div>
              <div className="text-xs text-gray-500">
                {new Date(Date.now() - i * 3600000).toLocaleString()}
              </div>
              <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 text-xs text-gray-400 hover:text-blue-400">
                  <Icon icon="solar:pen-bold-duotone" className="h-3 w-3" />
                </button>
                <button className="p-1 text-xs text-gray-400 hover:text-blue-400">
                  <Icon icon="solar:star-bold-duotone" className="h-3 w-3" />
                </button>
                <button className="p-1 text-xs text-gray-400 hover:text-red-400">
                  <Icon icon="solar:trash-bin-trash-bold-duotone" className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ToolsPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-3">Image Adjustments</h3>
        <div className="grid grid-cols-2 gap-2">
          <ToolButton icon="solar:brightness-bold-duotone" label="Brightness" />
          <ToolButton icon="solar:tuning-bold-duotone" label="Contrast" />
          <ToolButton icon="solar:palette-bold-duotone" label="Saturation" />
          <ToolButton icon="solar:slider-horizontal-bold-duotone" label="Temperature" />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-3">Style & Effects</h3>
        <div className="grid grid-cols-2 gap-2">
          <ToolButton icon="solar:magic-stick-bold-duotone" label="Artistic" />
          <ToolButton icon="solar:brush-bold-duotone" label="Painting" />
          <ToolButton icon="solar:gallery-bold-duotone" label="Vintage" />
          <ToolButton icon="solar:flash-bold-duotone" label="HDR" />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-3">AI Enhancement</h3>
        <div className="grid grid-cols-2 gap-2">
          <ToolButton icon="solar:square-top-up-bold-duotone" label="Upscale" premium />
          <ToolButton icon="solar:minimalistic-magnifer-bold-duotone" label="Enhance" premium />
          <ToolButton icon="solar:wand-magic-bold-duotone" label="Fix Faces" premium />
          <ToolButton icon="solar:paint-roller-bold-duotone" label="Inpainting" premium />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-3">Image Dimensions</h3>
        <div className="space-y-2">
          <button className="w-full py-2 px-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-sm flex items-center justify-between transition-colors">
            <span className="flex items-center">
              <Icon icon="solar:smartphone-bold-duotone" className="h-4 w-4 mr-2 text-blue-500" />
              Instagram Post (1:1)
            </span>
            <Icon icon="solar:chevron-down-bold-duotone" className="h-4 w-4 text-gray-500" />
          </button>
          
          <div className="grid grid-cols-3 gap-2">
            <AspectRatioButton label="1:1" />
            <AspectRatioButton label="4:5" />
            <AspectRatioButton label="16:9" />
          </div>
        </div>
      </div>
    </div>
  );
};

const PresetsPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-400 mb-3">Saved Presets</h3>
      
      <div className="space-y-2">
        {["Cyberpunk City", "Portrait Studio", "Fantasy Landscape", "Product Showcase"].map((preset, i) => (
          <div key={i} className="bg-gray-900 rounded-lg p-3 hover:bg-gray-800 transition-colors cursor-pointer">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Icon 
                  icon={[
                    "solar:city-bold-duotone", 
                    "solar:user-bold-duotone", 
                    "solar:mountains-bold-duotone", 
                    "solar:box-bold-duotone"
                  ][i % 4]} 
                  className="h-5 w-5 mr-3 text-blue-500" 
                />
                <span className="text-sm">{preset}</span>
              </div>
              <button className="p-1 text-gray-500 hover:text-gray-300">
                <Icon icon="solar:more-circle-bold-duotone" className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full flex items-center justify-center py-2 border border-dashed border-gray-700 rounded-lg text-gray-400 hover:text-blue-400 hover:border-blue-500 transition-colors">
        <Icon icon="solar:add-circle-bold-duotone" className="h-5 w-5 mr-2" />
        <span className="text-sm">Save Current Settings</span>
      </button>
      
      <h3 className="text-sm font-medium text-gray-400 mt-6 mb-3">Featured Presets</h3>
      <div className="grid grid-cols-2 gap-2">
        {["Cinematic", "Neon", "Minimalist", "Vintage", "3D Render", "Watercolor"].map((style, i) => (
          <div 
            key={i}
            className={cn(
              "rounded-lg p-2 h-20 flex items-end",
              "bg-gradient-to-br transition-transform hover:scale-[1.02]",
              i % 6 === 0 ? "from-blue-600/30 to-purple-600/30" :
              i % 6 === 1 ? "from-pink-600/30 to-red-600/30" :
              i % 6 === 2 ? "from-gray-600/30 to-gray-800/30" :
              i % 6 === 3 ? "from-yellow-600/30 to-orange-600/30" :
              i % 6 === 4 ? "from-cyan-600/30 to-blue-600/30" :
              "from-green-600/30 to-teal-600/30"
            )}
          >
            <span className="text-xs font-medium">{style}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ToolButtonProps {
  icon: string;
  label: string;
  premium?: boolean;
}

const ToolButton: React.FC<ToolButtonProps> = ({ icon, label, premium }) => {
  return (
    <button className="bg-gray-900 hover:bg-gray-800 transition-colors rounded-lg p-2 text-left flex items-center relative group">
      <Icon icon={icon} className="h-5 w-5 mr-2 text-blue-500" />
      <span className="text-xs">{label}</span>
      {premium && (
        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full h-4 w-4 flex items-center justify-center">
          <Icon icon="solar:crown-bold-duotone" className="h-3 w-3 text-white" />
        </div>
      )}
    </button>
  );
};

interface AspectRatioButtonProps {
  label: string;
  active?: boolean;
}

const AspectRatioButton: React.FC<AspectRatioButtonProps> = ({ label, active }) => {
  return (
    <button className={cn(
      "py-1 px-2 text-xs rounded border transition-colors",
      active 
        ? "bg-blue-500/20 border-blue-500 text-blue-400" 
        : "bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
    )}>
      {label}
    </button>
  );
};

export default FeaturesSidebar;