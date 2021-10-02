import { createContext, useState, useEffect } from "react";
import NotificationAlert from "../../components/notification-alert/notification-alert.component";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    let isCleanupStated = false;
    if (notification) {
      setTimeout(() => {
        if (!isCleanupStated) setNotification(null);
      }, notification.time);
    }
    return () => (isCleanupStated = true);
  }, [notification]);

  const createNotification = (message, time) => {
    setNotification({ message, time });
  };
  return (
    <NotificationContext.Provider
      value={{
        createNotification,
      }}
    >
      {children}
      {notification && (
        <NotificationAlert variant="success">
          {notification.message}{" "}
        </NotificationAlert>
      )}
    </NotificationContext.Provider>
  );
};
