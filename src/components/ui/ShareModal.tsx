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
    color: 'text-primary',
    bgColor: 'bg-primary/10 hover:bg-primary/20'
  },
  {
    name: 'Facebook',
    icon: 'solar:share-circle-rounded-linear',
    color: 'text-primary',
    bgColor: 'bg-primary/10 hover:bg-primary/20'
  },
  {
    name: 'LinkedIn',
    icon: 'solar:link-circle-rounded-linear',
    color: 'text-primary',
    bgColor: 'bg-primary/10 hover:bg-primary/20'
  },
  {
    name: 'WhatsApp',
    icon: 'solar:chat-round-dots-linear',
    color: 'text-semantic-success',
    bgColor: 'bg-semantic-success/10 hover:bg-semantic-success/20'
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
              <Dialog.Panel className="w-full max-w-md bg-content1 rounded-2xl shadow-xl border border-border-primary">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <Dialog.Title className="text-xl font-bold text-text-primary">
                      Share PixelMuse
                    </Dialog.Title>
                    <button
                      onClick={onClose}
                      className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-content2 transition-colors"
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
                          <span className="font-medium text-text-primary">{platform.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Copy Link Section */}
                    <div>
                      <label className="block text-sm text-text-secondary mb-2">
                        Or copy this link
                      </label>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-content2 rounded-xl px-4 py-2.5 text-sm text-text-secondary truncate">
                          {shareUrl}
                        </div>
                        <button
                          onClick={copyToClipboard}
                          className="px-4 bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center gap-2 transition-colors"
                        >
                          <Icon icon="solar:copy-rounded-linear" className="w-4 h-4" />
                          Copy
                        </button>
                      </div>
                    </div>

                    {/* Referral Info */}
                    <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-secondary/20 rounded-lg">
                          <Icon icon="solar:gift-rounded-linear" className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-secondary">
                            Earn Rewards
                          </h3>
                          <p className="text-xs text-text-secondary mt-1">
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