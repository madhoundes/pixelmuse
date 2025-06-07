import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { cn } from '../../utils/cn';

interface Notification {
  id: string;
  type: 'video' | 'announcement' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'video',
    title: 'New Tutorial Available',
    message: 'Watch our latest video on mastering AI image generation techniques',
    timestamp: '2h ago',
    read: false
  },
  {
    id: '2',
    type: 'announcement',
    title: 'Platform Updates',
    message: 'We\'ve added new features to enhance your thumbnail creation experience',
    timestamp: '1d ago',
    read: false
  },
  {
    id: '3',
    type: 'alert',
    title: 'Low Credit Balance',
    message: 'Your credit balance is running low. Consider upgrading to continue creating amazing content',
    timestamp: '2d ago',
    read: false
  },
  {
    id: '4',
    type: 'video',
    title: 'Quick Start Guide',
    message: 'Learn the basics of PixelMuse in our comprehensive video tutorial',
    timestamp: '3d ago',
    read: true
  }
];

const NotificationDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications([]);
    setShowSuccess(true);
  };

  const handleRevert = () => {
    setNotifications(initialNotifications);
    setShowSuccess(false);
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="relative p-2 rounded-full transition-all duration-200 hover:bg-gray-800 text-gray-400 hover:text-white">
        <Icon icon="solar:bell-linear" className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-[10px] font-medium text-white">{unreadCount}</span>
          </span>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-96 bg-[#151823] rounded-xl shadow-lg border border-gray-700 focus:outline-none z-[100]">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h2 className="font-medium">Updates & News</h2>
                {showSuccess && (
                  <button 
                    onClick={handleRevert}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white px-2 py-1 rounded transition-colors"
                  >
                    Revert
                  </button>
                )}
              </div>
              {unreadCount > 0 && (
                <button 
                  onClick={handleMarkAllAsRead}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          <div className="py-2 max-h-[400px] overflow-y-auto">
            {showSuccess ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-800/50 rounded-full flex items-center justify-center">
                  <Icon 
                    icon="solar:inbox-out-linear" 
                    className="w-8 h-8 text-blue-400" 
                  />
                </div>
                <h3 className="text-lg font-medium mb-2">All Caught Up!</h3>
                <p className="text-sm text-gray-400">
                  We'll notify you when new updates or tutorials are available.
                </p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-8 text-center">
                <Icon 
                  icon="solar:bell-off-linear" 
                  className="w-12 h-12 mx-auto text-gray-500 mb-3" 
                />
                <p className="text-sm text-gray-400">No updates available</p>
              </div>
            ) : (
              <>
                {notifications.map((notification) => (
                  <Menu.Item key={notification.id}>
                    {({ active }) => (
                      <button
                        className={cn(
                          "w-full px-4 py-3 flex items-start gap-3 relative",
                          active ? "bg-gray-800" : "",
                          !notification.read && "bg-blue-500/5"
                        )}
                      >
                        <div className="p-2 rounded-lg flex-shrink-0 bg-blue-500/10">
                          <Icon 
                            icon={
                              notification.type === 'video' ? "solar:video-frame-linear" :
                              notification.type === 'announcement' ? "solar:bell-linear" :
                              "solar:danger-triangle-linear"
                            } 
                            className="w-5 h-5 text-blue-500" 
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-sm font-medium mb-0.5">{notification.title}</p>
                          <p className="text-xs text-gray-400 line-clamp-2">{notification.message}</p>
                          <p className="text-[10px] text-gray-500 mt-1">{notification.timestamp}</p>
                        </div>

                        {!notification.read && (
                          <span className="absolute top-4 right-4 h-2 w-2 bg-blue-500 rounded-full" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NotificationDropdown;