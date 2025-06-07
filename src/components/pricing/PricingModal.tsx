import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { cn } from '../../utils/cn';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlanFeature {
  text: string;
  tooltip?: string;
}

const standardFeatures: PlanFeature[] = [
  { text: "20 HD Thumbnail Generations per month" },
  { text: "Access to all basic templates" },
  { text: "Standard support response time" },
  { text: "Basic editing tools" },
  { text: "720p max resolution" }
];

const premiumFeatures: PlanFeature[] = [
  { text: "100 HD Thumbnail Generations per month" },
  { text: "Access to premium templates", tooltip: "Exclusive designs and layouts" },
  { text: "Priority support (24/7)" },
  { text: "Advanced AI editing tools" },
  { text: "4K max resolution" },
  { text: "Custom branding options" }
];

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
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
              <Dialog.Panel className="w-full max-w-4xl bg-[#151823] rounded-2xl shadow-xl">
                <div className="p-6 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-2xl font-bold">
                      Upgrade Your Plan
                    </Dialog.Title>
                    <button
                      onClick={onClose}
                      className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <Icon icon="solar:close-circle-linear" className="w-6 h-6" />
                    </button>
                  </div>
                  <p className="mt-2 text-gray-400">
                    Choose the perfect plan for your thumbnail creation needs
                  </p>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Standard Pro Plan */}
                    <div className="bg-[#1C1F2E] rounded-xl p-6 border border-gray-800">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold">Standard Pro</h3>
                          <p className="text-gray-400 text-sm mt-1">
                            Perfect for content creators
                          </p>
                        </div>
                        <Icon 
                          icon="solar:stars-minimalistic-linear" 
                          className="w-6 h-6 text-blue-400" 
                        />
                      </div>

                      <div className="mb-6">
                        <div className="flex items-end gap-2">
                          <span className="text-3xl font-bold">$19</span>
                          <span className="text-gray-400 mb-1">/month</span>
                        </div>
                        <div className="text-sm text-blue-400 mt-1">
                          Save 20% with annual billing
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {standardFeatures.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Icon 
                              icon="solar:check-circle-linear" 
                              className="w-5 h-5 text-blue-400 flex-shrink-0" 
                            />
                            <span className="text-sm">{feature.text}</span>
                          </div>
                        ))}
                      </div>

                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2.5 font-medium transition-colors">
                        Select Standard Pro
                      </button>
                    </div>

                    {/* Premium Pro Plan */}
                    <div className="bg-gradient-to-b from-[#1C1F2E] to-[#1C1F2E] rounded-xl p-6 border border-blue-500/20 relative">
                      <div className="absolute -top-3 right-6 px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                        Most Popular
                      </div>

                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold">Premium Pro</h3>
                          <p className="text-gray-400 text-sm mt-1">
                            For professional creators
                          </p>
                        </div>
                        <Icon 
                          icon="solar:crown-linear" 
                          className="w-6 h-6 text-yellow-500" 
                        />
                      </div>

                      <div className="mb-6">
                        <div className="flex items-end gap-2">
                          <span className="text-3xl font-bold">$49</span>
                          <span className="text-gray-400 mb-1">/month</span>
                        </div>
                        <div className="text-sm text-blue-400 mt-1">
                          Save 25% with annual billing
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {premiumFeatures.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2 group relative">
                            <Icon 
                              icon="solar:check-circle-linear" 
                              className="w-5 h-5 text-blue-400 flex-shrink-0" 
                            />
                            <span className="text-sm">{feature.text}</span>
                            {feature.tooltip && (
                              <div className="absolute left-6 -top-8 w-48 bg-gray-900 text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {feature.tooltip}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg py-2.5 font-medium transition-colors">
                        Select Premium Pro
                      </button>
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

export default PricingModal;