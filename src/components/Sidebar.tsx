import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '../utils/cn';
import Toggle from './ui/Toggle';
import { Listbox } from '@headlessui/react';

const positions = [
  { id: 'top-right', name: 'Top Right' },
  { id: 'top-left', name: 'Top Left' },
  { id: 'bottom-right', name: 'Bottom Right' },
  { id: 'bottom-left', name: 'Bottom Left' },
  { id: 'center', name: 'Center' }
];

interface AccordionSectionProps {
  title: string;
  icon: string;
  iconColor?: string;
  titleColor?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  icon,
  iconColor = "text-[#C9A9E9]",
  titleColor = "text-[#AE7EDE]",
  children,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section 
      className="bg-[#262F3D] rounded-[14px] border border-[#2E3A4C] overflow-hidden"
      data-section-type="accordion"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between h-[34px] mb-[34px] px-4 focus:outline-none"
        aria-expanded={isOpen}
        data-control="accordion-trigger"
      >
        <div className="flex items-center gap-2">
          <Icon 
            icon={icon}
            className={cn("h-5 w-5", iconColor)}
            data-element="section-icon"
          />
          <span className={cn("font-medium", titleColor)} data-element="section-title">{title}</span>
        </div>
        <Icon 
          icon="solar:alt-arrow-down-linear"
          className={cn(
            "h-5 w-5 text-white transition-transform duration-300 ease-in-out",
            isOpen ? "rotate-180" : "rotate-0"
          )}
          data-element="accordion-arrow"
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
        data-element="accordion-content"
      >
        <div className="overflow-hidden">
          <div className="p-4 pt-0 space-y-7">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const [textEnabled, setTextEnabled] = useState(true);
  const [includePerson, setIncludePerson] = useState(false);
  const [includeIcons, setIncludeIcons] = useState(false);
  const [textPosition, setTextPosition] = useState('top-right');
  const [textSize, setTextSize] = useState('medium');
  const [activeTab, setActiveTab] = useState<'editor' | 'templates'>('editor');
  const [focusPosition, setFocusPosition] = useState({ x: 0, y: 0, width: 0 });
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);

  const updateFocusPosition = (button: HTMLButtonElement) => {
    if (!tabsRef.current || !focusRef.current) return;
    
    const tabsRect = tabsRef.current.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    setFocusPosition({
      x: buttonRect.left - tabsRect.left,
      y: 0,
      width: buttonRect.width
    });
  };

  useEffect(() => {
    if (!tabsRef.current) return;
    
    const activeButton = tabsRef.current.querySelector(`[data-tab="${activeTab}"]`) as HTMLButtonElement;
    if (activeButton) {
      updateFocusPosition(activeButton);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleTabClick = (tab: 'editor' | 'templates', event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    updateFocusPosition(button);
    setActiveTab(tab);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="h-screen overflow-y-auto bg-[#151823] border-r border-gray-800/50 flex flex-col" id="design-controls-sidebar">
      <div className="p-4 border-b border-gray-800/50 sticky top-0 bg-[#151823] z-10" data-section="header">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon icon="solar:flash-bold-duotone" className="h-6 w-6 text-purple-500" />
            <h1 className="text-lg font-semibold text-purple-500">Thumbnail Spark</h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <Icon icon="solar:close-circle-linear" className="w-6 h-6" />
          </button>
        </div>

        <div 
          ref={tabsRef}
          className="bg-[#394150] p-[5px] rounded-[14px] flex relative h-[52px]"
          data-control="main-tabs"
        >
          <div
            ref={focusRef}
            className="absolute transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              transform: `translate3d(${focusPosition.x}px, 5px, 0)`,
              width: `${focusPosition.width}px`,
              height: '42px'
            }}
            data-element="tab-focus-indicator"
          >
            <div className="absolute inset-0 bg-[#006EEE] rounded-[12px] shadow-lg opacity-90 transition-opacity duration-200">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-blue-600/50 animate-gradient rounded-[12px]" />
            </div>
          </div>

          <button
            data-tab="editor"
            onClick={(e) => handleTabClick('editor', e)}
            className={cn(
              "flex-1 flex items-center justify-center gap-3 py-2.5 px-4 rounded-[12px]",
              "font-medium transition-colors duration-200 relative z-10 cursor-pointer",
              activeTab === 'editor' ? "text-white" : "text-[#A1A1AA] hover:text-white"
            )}
          >
            <Icon 
              icon="solar:pen-bold-duotone" 
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                activeTab === 'editor' && "transform scale-[1.02]"
              )} 
            />
            <span>Editor</span>
          </button>

          <button
            data-tab="templates"
            onClick={(e) => handleTabClick('templates', e)}
            className={cn(
              "flex-1 flex items-center justify-center gap-3 py-2.5 px-4 rounded-[12px]",
              "font-medium transition-colors duration-200 relative z-10 cursor-pointer",
              activeTab === 'templates' ? "text-white" : "text-[#A1A1AA] hover:text-white"
            )}
          >
            <Icon 
              icon="solar:gallery-wide-bold-duotone" 
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                activeTab === 'templates' && "transform scale-[1.02]"
              )} 
            />
            <span>Templates</span>
          </button>
        </div>
      </div>

      <div className="p-4" data-section="controls">
        <div className="space-y-4">
          <AccordionSection
            title="Basic Controls"
            icon="solar:ruler-pen-bold-duotone"
            defaultOpen={true}
          >
            <div className="flex items-center justify-between" data-control="text-overlay-toggle">
              <div className="flex items-center gap-2">
                <span className="text-[#D4D4D8]">Enable Text Overlay?</span>
                <Icon 
                  icon="solar:info-circle-linear"
                  className="h-[18px] w-[18px] text-[#717179] cursor-help"
                />
              </div>
              <Toggle 
                isActive={textEnabled}
                onToggle={() => setTextEnabled(!textEnabled)}
                label="Enable text overlay"
              />
            </div>

            <div className="flex items-center justify-between" data-control="person-toggle">
              <div className="flex items-center gap-2">
                <span className="text-[#D4D4D8]">Include Person?</span>
                <Icon 
                  icon="solar:info-circle-linear"
                  className="h-[18px] w-[18px] text-[#717179] cursor-help"
                />
              </div>
              <Toggle 
                isActive={includePerson}
                onToggle={() => setIncludePerson(!includePerson)}
                label="Include person"
              />
            </div>

            <div className="flex items-center justify-between" data-control="icons-toggle">
              <div className="flex items-center gap-2">
                <span className="text-[#D4D4D8]">Include Icons?</span>
                <Icon 
                  icon="solar:info-circle-linear"
                  className="h-[18px] w-[18px] text-[#717179] cursor-help"
                />
              </div>
              <Toggle 
                isActive={includeIcons}
                onToggle={() => setIncludeIcons(!includeIcons)}
                label="Include icons"
              />
            </div>
          </AccordionSection>

          {includePerson && (
            <AccordionSection
              title="Person Image"
              icon="solar:user-circle-bold-duotone"
              iconColor="text-blue-400"
              titleColor="text-blue-400"
            >
              <div className="space-y-4">
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm text-[#D4D4D8] mb-2">Image Source:</label>
                    <div className="bg-[#394150] rounded-[14px] p-[5px] flex gap-[5px]">
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="imageSource"
                          value="upload"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="flex items-center justify-center gap-2 h-[37px] rounded-[12px] text-sm font-medium transition-all duration-200 cursor-pointer peer-checked:bg-[#006EEE] peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-blue-500/25 text-[#A1A1AA] hover:text-white">
                          <Icon icon="solar:upload-linear" className="w-4 h-4" />
                          Upload
                        </div>
                      </label>
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="imageSource"
                          value="url"
                          className="sr-only peer"
                        />
                        <div className="flex items-center justify-center gap-2 h-[37px] rounded-[12px] text-sm font-medium transition-all duration-200 cursor-pointer peer-checked:bg-[#006EEE] peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-blue-500/25 text-[#A1A1AA] hover:text-white">
                          <Icon icon="solar:link-circle-linear" className="w-4 h-4" />
                          URL
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Paste image URL here..."
                      className="w-full bg-[#1C1F2E] h-[53px] px-4 rounded-[14px] text-white placeholder-[#71717A] text-sm focus:outline-none focus:ring-1 focus:ring-[#006EEE]/50 shadow-sm shadow-black/5"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-[120px] border-2 border-dashed border-[#394150] rounded-[14px] flex flex-col items-center justify-center gap-2 hover:bg-[#1C1F2E] transition-colors group"
                    >
                      {imageUrl ? (
                        <div className="relative w-full h-full">
                          <img
                            src={imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-[12px]"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-[12px] flex items-center justify-center">
                            <Icon icon="solar:refresh-circle-linear" className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-[#394150] flex items-center justify-center">
                            <Icon icon="solar:upload-linear" className="w-6 h-6 text-[#71717A] group-hover:text-white transition-colors" />
                          </div>
                          <span className="text-sm text-[#71717A] group-hover:text-white transition-colors">
                            Click to upload image
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </AccordionSection>
          )}

          {textEnabled && (
            <AccordionSection
              title="Text Settings"
              icon="solar:text-bold-duotone"
            >
              <div className="space-y-4">
                <div data-control="text-input">
                  <label className="block text-sm text-[#D4D4D8] mb-2">Overlay Text:</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="YOUR VIDEO TITLE HERE"
                      className="w-full bg-[#1C1F2E] h-[53px] px-4 rounded-[14px] text-white placeholder-[#71717A] text-sm focus:outline-none focus:ring-1 focus:ring-[#006EEE]/50 shadow-sm shadow-black/5"
                    />
                  </div>
                </div>

                <div data-control="text-position">
                  <label className="block text-sm text-[#D4D4D8] mb-2">Text Position:</label>
                  <div className="relative">
                    <Listbox
                      as="div"
                      value={textPosition}
                      onChange={setTextPosition}
                      className="relative"
                    >
                      <Listbox.Button className="w-full bg-[#1C1F2E] h-[53px] px-4 rounded-[14px] text-white text-sm text-left flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-gray-600 shadow-sm shadow-black/5">
                        <span>{positions.find(p => p.id === textPosition)?.name}</span>
                        <Icon 
                          icon="solar:alt-arrow-down-linear" 
                          className="w-4 h-4 text-[#71717A]" 
                        />
                      </Listbox.Button>

                      <div className="relative">
                        <Listbox.Options className="absolute z-[60] w-full mt-2 bg-[#1C1F2E] rounded-[14px] shadow-lg border border-gray-700/50 py-1 focus:outline-none">
                          {positions.map((position) => (
                            <Listbox.Option
                              key={position.id}
                              value={position.id}
                              className={({ active, selected }) => cn(
                                "px-4 py-2.5 text-sm cursor-pointer flex items-center",
                                selected ? "text-white" : "text-gray-300",
                                active ? "bg-gray-800" : ""
                              )}
                            >
                              {({ selected }) => (
                                <>
                                  <span>{position.name}</span>
                                  {selected && (
                                    <Icon 
                                      icon="solar:check-circle-bold-duotone" 
                                      className="ml-auto w-4 h-4 text-white" 
                                    />
                                  )}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>
                </div>

                <div data-control="text-size">
                  <label className="block text-sm text-[#D4D4D8] mb-2">Text Size:</label>
                  <div className="bg-[#394150] rounded-[14px] p-[5px] flex gap-[5px]">
                    {['Small', 'Medium', 'Large'].map((size) => (
                      <label key={size} className="flex-1">
                        <input
                          type="radio"
                          name="textSize"
                          value={size.toLowerCase()}
                          checked={textSize === size.toLowerCase()}
                          onChange={(e) => setTextSize(e.target.value)}
                          className="sr-only"
                        />
                        <span className={cn(
                          "flex items-center justify-center h-[37px] rounded-[12px] text-sm font-medium transition-all duration-200 cursor-pointer",
                          textSize === size.toLowerCase()
                            ? "bg-[#006EEE] text-white shadow-lg shadow-blue-500/25"
                            : "text-[#A1A1AA] hover:text-white"
                        )}>
                          {size}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionSection>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;