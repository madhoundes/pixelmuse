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
      <div className="bg-content2 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Welcome back, {mockUser.name}!</h1>
            <p className="text-text-secondary">Last login: Today at 9:42 AM</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-content2 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-text-primary">Monthly Credits</h3>
            <Icon icon="solar:stars-bold-duotone" className="w-6 h-6 text-warning" />
          </div>
          <p className="text-2xl font-bold text-text-primary">591/7,000</p>
          <div className="mt-2 h-2 bg-content3 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-warning to-warning/80" 
              style={{ width: '45%' }}
            />
          </div>
        </div>

        <div className="bg-content2 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-text-primary">Generations</h3>
            <Icon icon="solar:history-bold-duotone" className="w-6 h-6 text-primary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">247</p>
          <p className="text-sm text-text-secondary mt-2">Last 30 days</p>
        </div>

        <div className="bg-content2 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-text-primary">Subscription</h3>
            <Icon icon="solar:crown-bold-duotone" className="w-6 h-6 text-warning" />
          </div>
          <p className="text-2xl font-bold text-text-primary">Pro Plan</p>
          <p className="text-sm text-text-secondary mt-2">Renews Jun 2nd, 2025</p>
        </div>
      </div>

      {/* Monthly Limit Banner */}
      <div className="bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-warning/20 rounded-lg flex-shrink-0">
            <Icon icon="solar:chart-square-bold-duotone" className="w-6 h-6 text-warning" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-warning mb-2">
              You've reached your monthly limit!
            </h3>
            <p className="text-text-secondary mb-4">
              Upgrade to Pro to create unlimited thumbnails and access premium features.
            </p>
            <button 
              onClick={() => setIsPricingModalOpen(true)}
              className="bg-gradient-to-r from-warning to-warning/80 hover:from-warning/90 hover:to-warning/70 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-text-primary">Recent Activity</h2>
        <div className="bg-content2 rounded-xl p-6">
          <div className="space-y-4">
            {mockGenerations.slice(0, 3).map((generation, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 bg-content3 rounded-lg hover:bg-content4 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon icon="solar:magic-stick-bold-duotone" className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary">{generation.prompt}</h4>
                  <p className="text-sm text-text-secondary">{generation.timestamp}</p>
                </div>
                <button 
                  onClick={() => setIsShareModalOpen(true)}
                  className="p-2 hover:bg-content2 rounded-lg transition-colors"
                >
                  <Icon icon="solar:share-bold-duotone" className="w-5 h-5 text-text-secondary hover:text-text-primary" />
                </button>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('history')}
            className="w-full mt-4 py-2.5 bg-content3 hover:bg-content4 rounded-lg transition-colors text-sm font-medium text-text-primary"
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
        <h2 className="text-xl font-bold mb-4 text-text-primary">Subscription</h2>
        <div className="bg-content2 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-default-100 text-text-secondary rounded-full text-sm font-medium">
              Free
            </span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
              Essential
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-warning/20 to-warning/10 rounded-full border border-warning/20">
              <Icon icon="solar:crown-linear" className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-warning">Pro</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-text-primary">12 CAD/month</span>
              <span className="text-sm text-text-secondary">(VAT or sales tax may apply)</span>
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-text-secondary">Billed monthly</p>
              <p className="text-sm text-text-secondary">Next payment: Jun 2nd, 2025</p>
            </div>
            <div className="mt-4 flex flex-col items-end gap-2">
              <button className="text-text-secondary hover:text-text-primary text-sm transition-colors">
                Upgrade plan
              </button>
              <button className="text-text-secondary hover:text-text-primary text-sm transition-colors">
                Change to annual billing
              </button>
              <button className="text-semantic-error hover:text-semantic-error/80 text-sm transition-colors">
                Cancel subscription renewal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Credits Section */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-text-primary">Credits</h2>
        <div className="bg-content2 rounded-xl p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-text-primary">591/7,000</span>
          </div>
          <p className="text-text-secondary mt-2">Monthly credits remaining</p>
          <div className="mt-4 h-2 bg-content3 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary" 
              style={{ width: '45%' }}
            />
          </div>
          <p className="text-sm text-text-secondary mt-4">Credits reset every month</p>
        </div>
      </div>

      {/* Billing Information Section */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-text-primary">Billing Information</h2>
        <div className="bg-content2 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg text-text-primary">Ahmed</h3>
              <p className="text-text-secondary mt-1">madhoundes@gmail.com</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button className="text-text-secondary hover:text-text-primary text-sm transition-colors">
                Billing history
              </button>
              <button className="text-text-secondary hover:text-text-primary text-sm transition-colors">
                Change billing information
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details Section */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-text-primary">Payment Details</h2>
        <div className="bg-content2 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Icon icon="solar:card-bold" className="w-6 h-6 text-text-secondary" />
              <div>
                <span className="font-medium text-text-primary">•••• •••• •••• 9942</span>
                <p className="text-sm text-text-secondary mt-1">Expires 12/25</p>
              </div>
            </div>
            <button className="text-text-secondary hover:text-text-primary text-sm transition-colors">
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
        <h2 className="text-xl font-bold mb-4 text-text-primary">Personal Information</h2>
        <div className="bg-content2 rounded-xl p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-24 h-24 rounded-xl object-cover"
              />
              <button className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors">
                <Icon icon="solar:pen-bold" className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Full Name</label>
                <input
                  type="text"
                  value={mockUser.name}
                  className="w-full bg-content3 rounded-lg px-4 py-2.5 text-text-primary border border-border-primary focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">Email Address</label>
                <input
                  type="email"
                  value={mockUser.email}
                  className="w-full bg-content3 rounded-lg px-4 py-2.5 text-text-primary border border-border-primary focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-text-primary">Security</h2>
        <div className="bg-content2 rounded-xl p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-text-primary">Password</h3>
                <p className="text-sm text-text-secondary">Last changed 3 months ago</p>
              </div>
              <button className="px-4 py-2 bg-content3 hover:bg-content4 rounded-lg transition-colors text-text-primary">
                Change Password
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-border-primary">
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-semantic-error/50 hover:bg-semantic-error/10 rounded-lg transition-colors text-semantic-error hover:text-semantic-error/80"
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
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-content1 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-6 border-b border-border-primary">
              <button
                onClick={() => setActiveTab('overview')}
                className={cn(
                  "pb-4 relative flex items-center gap-2 transition-colors duration-200",
                  activeTab === 'overview' 
                    ? "text-text-primary border-b-2 border-primary" 
                    : "text-text-secondary hover:text-text-primary"
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
                    ? "text-text-primary border-b-2 border-primary" 
                    : "text-text-secondary hover:text-text-primary"
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
                    ? "text-text-primary border-b-2 border-primary" 
                    : "text-text-secondary hover:text-text-primary"
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
                    ? "text-text-primary border-b-2 border-primary" 
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                <Icon icon="solar:history-bold-duotone" className="w-5 h-5" />
                Generation History
              </button>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-content3 transition-colors"
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