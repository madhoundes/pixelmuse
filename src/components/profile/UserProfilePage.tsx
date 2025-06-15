import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import GenerationHistory from './GenerationHistory';
import ShareModal from '../ui/ShareModal';
import DeleteConfirmationModal from '../ui/DeleteConfirmationModal';
import PricingModal from '../pricing/PricingModal';
import { mockUser, mockGenerations } from '../../utils/profileMockData';

type ActiveTab = 'overview' | 'billing' | 'history' | 'account';

const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    // Here you would typically make an API call to delete the account
    console.log('Deleting account...');
    setIsDeleteModalOpen(false);
  };

  const handleClose = () => {
    navigate('/');
  };

  const renderOverviewContent = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-[#1C1F2E] rounded-xl p-6">
        <div className="flex items-center gap-4">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {mockUser.name}!</h1>
            <p className="text-gray-400">Last login: Today at 9:42 AM</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1C1F2E] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Monthly Credits</h3>
            <Icon icon="solar:stars-bold-duotone" className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold">591/7,000</p>
          <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500" 
              style={{ width: '45%' }}
            />
          </div>
        </div>

        <div className="bg-[#1C1F2E] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Generations</h3>
            <Icon icon="solar:history-bold-duotone" className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">247</p>
          <p className="text-sm text-gray-400 mt-2">Last 30 days</p>
        </div>

        <div className="bg-[#1C1F2E] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Subscription</h3>
            <Icon icon="solar:crown-bold-duotone" className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-2xl font-bold">Pro Plan</p>
          <p className="text-sm text-gray-400 mt-2">Renews Jun 2nd, 2025</p>
        </div>
      </div>

      {/* Free Plan Upgrade Banner */}
      {mockUser.plan === 'free' && (
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-500/20 rounded-lg flex-shrink-0">
              <Icon icon="solar:crown-bold-duotone" className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Unlock Premium Features
              </h3>
              <p className="text-gray-300 mb-4">
                Get unlimited HD generations, advanced AI tools, and priority support with Pro.
              </p>
              <button 
                onClick={() => setIsPricingModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Limit Banner */}
      <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-orange-500/20 rounded-lg flex-shrink-0">
            <Icon icon="solar:chart-square-bold-duotone" className="w-6 h-6 text-orange-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-orange-400 mb-2">
              You've reached your monthly limit!
            </h3>
            <p className="text-gray-300 mb-4">
              Upgrade to Pro to create unlimited thumbnails and access premium features.
            </p>
            <button 
              onClick={() => setIsPricingModalOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>

      {/* Second Upgrade Banner - Below Monthly Limit */}
      {mockUser.plan === 'free' && (
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-purple-500/20 rounded-lg flex-shrink-0">
              <Icon icon="solar:rocket-bold-duotone" className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">
                Ready to Level Up Your Content?
              </h3>
              <p className="text-gray-300 mb-4">
                Join thousands of creators who've upgraded to Pro for unlimited creativity and professional results.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setIsPricingModalOpen(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Start Pro Trial
                </button>
                <button 
                  onClick={() => setIsPricingModalOpen(true)}
                  className="border border-purple-500/30 hover:border-purple-500/50 text-purple-400 hover:text-purple-300 px-6 py-2.5 rounded-lg font-medium transition-colors"
                >
                  View Pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-[#1C1F2E] rounded-xl p-6">
          <div className="space-y-4">
            {mockGenerations.slice(0, 3).map((generation, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 bg-[#242838] rounded-lg hover:bg-[#2A2F42] transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Icon icon="solar:magic-stick-bold-duotone" className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{generation.prompt}</h4>
                  <p className="text-sm text-gray-400">{generation.timestamp}</p>
                </div>
                <button 
                  onClick={() => setIsShareModalOpen(true)}
                  className="p-2 hover:bg-[#1C1F2E] rounded-lg transition-colors"
                >
                  <Icon icon="solar:share-bold-duotone" className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('history')}
            className="w-full mt-4 py-2.5 bg-[#242838] hover:bg-[#2A2F42] rounded-lg transition-colors text-sm font-medium"
          >
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );

  const renderBillingContent = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Subscription Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Subscription</h2>
        <div className="bg-[#1C1F2E] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-sm font-medium">
              Free
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
              Essential
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full border border-orange-500/20">
              <Icon icon="solar:crown-linear" className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-400">Pro</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">12 CAD/month</span>
              <span className="text-sm text-gray-400">(VAT or sales tax may apply)</span>
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-400">Billed monthly</p>
              <p className="text-sm text-gray-400">Next payment: Jun 2nd, 2025</p>
            </div>
            <div className="mt-4 flex flex-col items-end gap-2">
              <button className="text-gray-300 hover:text-gray-100 text-sm transition-colors">
                Upgrade plan
              </button>
              <button className="text-gray-300 hover:text-gray-100 text-sm transition-colors">
                Change to annual billing
              </button>
              <button className="text-red-400 hover:text-red-300 text-sm transition-colors">
                Cancel subscription renewal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Credits Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Credits</h2>
        <div className="bg-[#1C1F2E] rounded-xl p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">591/7,000</span>
          </div>
          <p className="text-gray-400 mt-2">Monthly credits remaining</p>
          <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
              style={{ width: '45%' }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-4">Credits reset every month</p>
        </div>
      </div>

      {/* Billing Information Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Billing Information</h2>
        <div className="bg-[#1C1F2E] rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg">Ahmed</h3>
              <p className="text-gray-400 mt-1">madhoundes@gmail.com</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button className="text-gray-300 hover:text-gray-100 text-sm transition-colors">
                Billing history
              </button>
              <button className="text-gray-300 hover:text-gray-100 text-sm transition-colors">
                Change billing information
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
        <div className="bg-[#1C1F2E] rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Icon icon="solar:card-bold" className="w-6 h-6 text-gray-400" />
              <div>
                <span className="font-medium">•••• •••• •••• 9942</span>
                <p className="text-sm text-gray-400 mt-1">Expires 12/25</p>
              </div>
            </div>
            <button className="text-gray-300 hover:text-gray-100 text-sm transition-colors">
              Update payment details
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountContent = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Personal Information */}
      <div>
        <h2 className="text-xl font-bold mb-4">Personal Information</h2>
        <div className="bg-[#1C1F2E] rounded-xl p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-24 h-24 rounded-xl object-cover"
              />
              <button className="absolute -bottom-2 -right-2 p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
                <Icon icon="solar:pen-bold" className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  value={mockUser.name}
                  className="w-full bg-[#242838] rounded-lg px-4 py-2.5 text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  value={mockUser.email}
                  className="w-full bg-[#242838] rounded-lg px-4 py-2.5 text-gray-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div>
        <h2 className="text-xl font-bold mb-4">Security</h2>
        <div className="bg-[#1C1F2E] rounded-xl p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Password</h3>
                <p className="text-sm text-gray-400">Last changed 3 months ago</p>
              </div>
              <button className="px-4 py-2 bg-[#242838] hover:bg-[#2A2F42] rounded-lg transition-colors">
                Change Password
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-700">
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-red-500/50 hover:bg-red-500/10 rounded-lg transition-colors text-red-400 hover:text-red-300"
            >
              <Icon icon="solar:trash-bin-minimalistic-2-linear" className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-[#151823] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-6 border-b border-gray-700">
              <button
                onClick={() => setActiveTab('overview')}
                className={cn(
                  "pb-4 relative flex items-center gap-2 transition-colors duration-200",
                  activeTab === 'overview' 
                    ? "text-white border-b-2 border-blue-500" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                <Icon icon="solar:home-2-bold-duotone" className="w-5 h-5" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={cn(
                  "pb-4 relative flex items-center gap-2 transition-colors duration-200",
                  activeTab === 'account' 
                    ? "text-white border-b-2 border-blue-500" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                <Icon icon="solar:user-circle-bold-duotone" className="w-5 h-5" />
                Account
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={cn(
                  "pb-4 relative flex items-center gap-2 transition-colors duration-200",
                  activeTab === 'billing' 
                    ? "text-white border-b-2 border-blue-500" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                <Icon icon="solar:card-bold-duotone" className="w-5 h-5" />
                Billing & Subscription
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={cn(
                  "pb-4 relative flex items-center gap-2 transition-colors duration-200",
                  activeTab === 'history' 
                    ? "text-white border-b-2 border-blue-500" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                <Icon icon="solar:history-bold-duotone" className="w-5 h-5" />
                Generation History
              </button>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Close profile"
            >
              <Icon icon="solar:close-circle-linear" className="w-6 h-6" />
            </button>
          </div>

          <div className="relative">
            {activeTab === 'overview' && renderOverviewContent()}
            {activeTab === 'account' && renderAccountContent()}
            {activeTab === 'billing' && renderBillingContent()}
            {activeTab === 'history' && (
              <div className="animate-fade-in">
                <GenerationHistory generations={mockGenerations} />
              </div>
            )}
          </div>
        </div>
      </div>

      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        itemName="your account"
      />

      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </div>
  );
};

export default UserProfilePage;