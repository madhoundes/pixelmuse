import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import FocusTrap from 'focus-trap-react';
import { Dialog } from '@headlessui/react';
import { cn } from '../../utils/cn';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <FocusTrap>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
        initialFocus={cancelButtonRef}
        role="alertdialog"
        aria-modal="true"
        open={isOpen}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

          {/* Center modal */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-middle my-8 w-full max-w-md text-left">
            <div 
              className={cn(
                "relative bg-content1 rounded-xl shadow-xl transform transition-all",
                "border border-border-primary"
              )}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-semantic-error/10 rounded-xl">
                    <Icon 
                      icon="solar:trash-bin-trash-bold-duotone" 
                      className="w-7 h-7 text-semantic-error" 
                    />
                  </div>
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-text-primary"
                      id="delete-modal-title"
                    >
                      Delete Confirmation
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-sm text-text-secondary">
                      This action cannot be undone
                    </Dialog.Description>
                  </div>
                </div>

                <div className="bg-semantic-error/5 border border-semantic-error/10 rounded-lg p-4 mb-6">
                  <p className="text-sm text-text-secondary">
                    Are you sure you want to delete <span className="text-text-primary font-medium">{itemName}</span>?
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    ref={cancelButtonRef}
                    onClick={onClose}
                    className={cn(
                      "flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      "bg-content2 hover:bg-content3 border border-border-primary text-text-primary"
                    )}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    className={cn(
                      "flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      "bg-gradient-to-r from-semantic-error to-semantic-error/90 hover:from-semantic-error/90 hover:to-semantic-error/80",
                      "text-white shadow-lg shadow-semantic-error/25"
                    )}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </FocusTrap>
  );
};

export default DeleteConfirmationModal;