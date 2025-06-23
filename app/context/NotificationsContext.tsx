import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { INotification } from "../db/db";
import { useTelegram } from "../shared/hooks/useTelegram";
import { getNotifications } from "../services/Notifications";

type NotificationContextType = {
  notification: INotification | null;
  setNotification: Dispatch<SetStateAction<INotification | null>>;
  notifications: INotification[];
  setNotifications: Dispatch<SetStateAction<INotification[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

  refetch: () => void;
};

export const NotificationsContext = createContext<NotificationContextType>({
  notification: null,
  setNotification: () => {},
  notifications: [],
  setNotifications: () => {},
  isLoading: false,
  setIsLoading: () => {},
  refetch: () => {},
});

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useTelegram();
  const [notification, setNotification] = useState<INotification | null>(null);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(() => {
    if (user) {
      setIsLoading(true);
      getNotifications(user.id).then((notifications) => {
        setNotifications(notifications);
        setIsLoading(false);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  return (
    <NotificationsContext.Provider
      value={{
        notification,
        setNotification,
        notifications,
        setNotifications,
        isLoading,
        setIsLoading,
        refetch,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
