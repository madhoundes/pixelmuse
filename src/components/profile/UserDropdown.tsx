import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { mockUser } from '../../utils/profileMockData';
import PricingModal from '../pricing/PricingModal';

const UserDropdown: React.FC = () => {
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-left hidden sm:block">
            <div className="text-sm font-medium">{mockUser.name}</div>
            <div className="text-xs text-gray-400">{mockUser.credits} credits</div>
          </div>
          <Icon icon="solar:alt-arrow-down-linear" className="w-4 h-4 text-gray-400" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-72 bg-[#151823] rounded-xl shadow-lg border border-gray-700 focus:outline-none z-[100]">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{mockUser.name}</div>
                  <div className="text-sm text-gray-400">{mockUser.email}</div>
                </div>
              </div>

              {/* Promotional Card */}
              <div className="mt-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-medium text-blue-400">Upgrade to Pro</h3>
                  <Icon icon="solar:crown-linear" className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  Get unlimited AI generations and premium features
                </p>
                <button 
                  onClick={() => setIsPricingOpen(true)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-2 rounded-lg transition-colors"
                >
                  Upgrade Now
                </button>
              </div>

              <div className="mt-4 bg-[#1C1F2E] rounded-lg p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Available Credits</span>
                  <span className="font-medium">{mockUser.credits}/{mockUser.maxCredits}</span>
                </div>
                <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${(mockUser.credits / mockUser.maxCredits) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="py-2">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/profile"
                    className={cn(
                      "flex items-center px-4 py-2 text-sm",
                      active ? "bg-gray-800" : ""
                    )}
                  >
                    <Icon icon="solar:user-circle-linear" className="w-5 h-5 mr-3" />
                    View Profile
                  </Link>
                )}
              </Menu.Item>
            </div>

            <div className="border-t border-gray-700 py-2">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={cn(
                      "flex items-center w-full px-4 py-2 text-sm text-red-400",
                      active ? "bg-gray-800" : ""
                    )}
                  >
                    <Icon icon="solar:logout-3-linear" className="w-5 h-5 mr-3" />
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <PricingModal 
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
    </>
  );
};

export default UserDropdown;