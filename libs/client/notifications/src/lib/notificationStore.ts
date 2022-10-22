import { AlertColor } from '@mui/material';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Notification {
  type: AlertColor;
  message: string;
}

interface NotificationContext {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  closeNotification: () => void;
}

export const useNotificationStore = create<NotificationContext>()(
  devtools(
    persist(
      set => ({
        notifications: [],
        addNotification: notification =>
          set(state => ({
            notifications: [...state.notifications, notification],
          })),
        closeNotification: () =>
          set(state => ({
            notifications: state.notifications.slice(1),
          })),
      }),
      { name: 'notification-storage' }
    )
  )
);
