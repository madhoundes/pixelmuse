import React from 'react';
import { Icon } from '@iconify/react';
import { User } from '../../utils/profileMockData';

interface SubscriptionPanelProps {
  user: User;
}

const SubscriptionPanel: React.FC<SubscriptionPanelProps> = ({ user }) => {
  return (
    <div className="bg-[#151823] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Subscription</h2>
        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
          {user.plan.toUpperCase()}
        </span>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium mb-1">Pro Plan</h3>
              <p className="text-sm text-gray-400">Unlimited HD generations</p>
            </div>
            <Icon icon="solar:crown-bold" className="w-6 h-6 text-yellow-500" />
          </div>
          
          <ul className="mt-4 space-y-2">
            {[
              'Unlimited HD Generations',
              'Priority Processing',
              'Advanced Editing Tools',
              'Premium Support'
            ].map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          
          <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 font-medium transition-colors">
            Manage Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPanel;