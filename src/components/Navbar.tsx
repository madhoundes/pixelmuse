import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import UserDropdown from './profile/UserDropdown';
import NotificationDropdown from './notifications/NotificationDropdown';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-[#151823] border-b border-gray-800 py-3 px-4 sticky top-0 z-20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Icon icon="solar:hamburger-menu-linear" className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center">
            <Icon 
              icon="solar:magic-stick-bold-duotone" 
              className="text-blue-500 h-8 w-8 mr-2" 
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              PixelMuse
            </h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Navbar;