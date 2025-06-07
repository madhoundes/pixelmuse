import React from 'react';
import { Icon } from '@iconify/react';
import { User } from '../../utils/profileMockData';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="bg-[#151823] rounded-2xl p-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full">
            <Icon icon="solar:pen-bold" className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-400">{user.email}</p>
          <div className="mt-4 flex items-center space-x-4">
            <button className="btn-primary">
              <Icon icon="solar:settings-bold" className="w-5 h-5 mr-2" />
              Edit Profile
            </button>
            <button className="btn-secondary">
              <Icon icon="solar:shield-user-bold" className="w-5 h-5 mr-2" />
              Security
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;