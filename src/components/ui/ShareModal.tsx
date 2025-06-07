import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { cn } from '../../utils/cn';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const socialPlatforms = [
  {
    name: 'Twitter',
    icon: 'solar:letter-rounded-linear',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10 hover:bg-blue-400/20'
  },
  {
    name: 'Facebook',
    icon: 'solar:share-circle-rounded-linear',
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10 hover:bg-blue-600/20'
  },
  {
    name: 'LinkedIn',
    icon: 'solar:link-circle-rounded-linear',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10 hover:bg-blue-500/20'
  },
  {
    name: 'WhatsApp',
    icon: 'solar:chat-round-dots-linear',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10 hover:bg-green-500/20'
  }
];

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const shareUrl = window.location.origin;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md bg-[#151823] rounded-2xl shadow-xl border border-gray-800/50">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <Dialog.Title className="text-xl font-bold">
                      Share PixelMuse
                    </Dialog.Title>
                    <button
                      onClick={onClose}
                      className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <Icon icon="solar:close-circle-rounded-linear" className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Social Share Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      {socialPlatforms.map((platform) => (
                        <button
                          key={platform.name}
                          className={cn(
                            "flex items-center justify-center gap-2 p-3 rounded-xl transition-colors",
                            platform.bgColor
                          )}
                        >
                          <Icon 
                            icon={platform.icon} 
                            className={cn("w-5 h-5", platform.color)} 
                          />
                          <span className="font-medium">{platform.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Copy Link Section */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Or copy this link
                      </label>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-[#1C1F2E] rounded-xl px-4 py-2.5 text-sm text-gray-400 truncate">
                          {shareUrl}
                        </div>
                        <button
                          onClick={copyToClipboard}
                          className="px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center gap-2 transition-colors"
                        >
                          <Icon icon="solar:copy-rounded-linear" className="w-4 h-4" />
                          Copy
                        </button>
                      </div>
                    </div>

                    {/* Referral Info */}
                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <Icon icon="solar:gift-rounded-linear" className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-purple-400">
                            Earn Rewards
                          </h3>
                          <p className="text-xs text-gray-400 mt-1">
                            Get 50 bonus credits for each friend who joins using your link
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShareModal;