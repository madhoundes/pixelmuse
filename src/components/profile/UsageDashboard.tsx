import React from 'react';
import { Icon } from '@iconify/react';
import { User } from '../../utils/profileMockData';

interface UsageDashboardProps {
  user: User;
}

const UsageDashboard: React.FC<UsageDashboardProps> = ({ user }) => {
  const percentage = (user.credits / user.maxCredits) * 100;

  return (
    <div className="bg-[#151823] rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Usage Dashboard</h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Credits Available</span>
            <span className="text-sm font-medium">{user.credits}/{user.maxCredits}</span>
          </div>
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1C1F2E] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Total Generated</span>
              <Icon icon="solar:chart-bold" className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          
          <div className="bg-[#1C1F2E] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">This Month</span>
              <Icon icon="solar:calendar-bold" className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold">256</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageDashboard;