import { FC, PropsWithChildren } from 'react';
import { NotificationAlert } from './Notification';
import { useNotificationStore } from './notificationStore';

export const NotificationWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { closeNotification, notifications } = useNotificationStore();
  const notification = notifications.find(() => true);

  return (
    <>
      {children}
      {notification && (
        <NotificationAlert
          open={true}
          onClose={() => closeNotification()}
          message={notification.message}
          type={notification.type}
        />
      )}
    </>
  );
};
