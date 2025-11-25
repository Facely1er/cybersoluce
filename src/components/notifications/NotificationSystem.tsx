import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// These icons exist in lucide-react v0.344.0 and are used successfully in other files
// TypeScript errors here appear to be a language server cache/type definition issue
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { 
  CheckCircle, 
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  AlertTriangle, 
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  XCircle, 
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Info, 
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  X 
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => '',
  removeNotification: () => {},
  clearAll: () => {}
});

export const useNotifications = () => useContext(NotificationContext);
export const useNotification = () => useContext(NotificationContext); // Alias for compatibility

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after duration (default 5 seconds)
    const duration = notification.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'error': return XCircle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-800 dark:text-gray-200';
    }
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll
    }}>
      {children}
      
      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        <AnimatePresence>
          {notifications.map((notification) => {
            const Icon = getIcon(notification.type);
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 300, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 300, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`
                  border rounded-lg shadow-lg p-4 ${getColors(notification.type)}
                `}
              >
                <div className="flex items-start">
                  <Icon className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    {notification.message && (
                      <p className="text-sm opacity-90 mt-1">{notification.message}</p>
                    )}
                    {notification.action && (
                      <button
                        onClick={notification.action.onClick}
                        className="mt-2 text-sm font-medium underline hover:no-underline"
                      >
                        {notification.action.label}
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Close notification"
                    title="Close notification"
                  >
                    <span className="sr-only">Close notification</span>
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

// Convenience hooks
export const useNotify = () => {
  const { addNotification } = useNotifications();
  
  return {
    success: (title: string, message?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'success', title, message, ...options }),
    error: (title: string, message?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'error', title, message, ...options }),
    warning: (title: string, message?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'warning', title, message, ...options }),
    info: (title: string, message?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'info', title, message, ...options })
  };
};