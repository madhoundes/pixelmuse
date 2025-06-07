import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { 
  Navbar as HeroNavbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem,
  Button
} from '@heroui/react';
import { cn } from '../utils/cn';
import UserDropdown from './profile/UserDropdown';
import NotificationDropdown from './notifications/NotificationDropdown';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <HeroNavbar 
      maxWidth="full"
      className="bg-content1 border-b border-divider"
      height="70px"
    >
      <NavbarContent justify="start">
        <NavbarItem className="lg:hidden">
          <Button
            isIconOnly
            variant="light"
            onPress={onMenuClick}
            aria-label="Toggle sidebar"
          >
            <Icon icon="solar:hamburger-menu-linear" className="w-6 h-6" />
          </Button>
        </NavbarItem>
        <NavbarBrand>
          <Link to="/" className="flex items-center">
            <Icon 
              icon="solar:magic-stick-bold-duotone" 
              className="text-primary h-8 w-8 mr-2" 
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              PixelMuse
            </h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      
      <NavbarContent justify="end">
        <NavbarItem>
          <NotificationDropdown />
        </NavbarItem>
        <NavbarItem>
          <UserDropdown />
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
};

export default Navbar;