import React, { useState } from 'react';
import { Bell, BellOff, X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const SmartNotifications: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'reminder',
      title: 'Saatnya Minum Air',
      message: 'Kamu belum minum air selama 2 jam. Hidrasi tubuh kamu!',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'Kamu berhasil menyelesaikan streak 7 hari!',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    },
    {
      id: 3,
      type: 'suggestion',
      title: 'Rekomendasi AI',
      message: 'Berdasarkan mood kamu, coba lakukan stretching ringan.',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder': return AlertCircle;
      case 'achievement': return CheckCircle;
      case 'suggestion': return Info;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'reminder': return 'text-orange-500';
      case 'achievement': return 'text-green-500';
      case 'suggestion': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <BellOff className="w-8 h-8 mx-auto mb-2" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${getNotificationColor(notification.type)}`} />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {formatTime(notification.timestamp)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="text-gray-400 hover:text-gray-600 ml-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-700 text-xs font-medium mt-2"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartNotifications;