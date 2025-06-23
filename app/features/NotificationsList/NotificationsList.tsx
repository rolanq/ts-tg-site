import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import CustomLoader from "@/app/shared/kit/CustomLoader/CustomLoader";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import React, { useCallback, useContext } from "react";
import styles from "./NotificationsList.module.css";
import { useTelegram } from "@/app/shared/hooks/useTelegram";
import NotificationCard from "../NotificationCard/NotificationCard";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { PlusIcon } from "@/app/shared/Icons/PlusIcon";
import Notification from "../Notification/Notification";
import { NotificationsContext } from "@/app/context/NotificationsContext";

export default function NotificationsList() {
  const { user } = useTelegram();
  const { notifications, isLoading, setNotification } =
    useContext(NotificationsContext);

  const handleAddNotification = useCallback(() => {
    if (!user?.id) {
      return;
    }

    setNotification({
      userId: String(user.id),
    });
  }, [setNotification, user?.id]);

  return (
    <>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <CustomLoader
            size={36}
            label="Загружаем список"
            loading={isLoading}
            successLabel="Список загружен"
          />
        </div>
      ) : (
        <div className={styles.container}>
          <CustomTyphography fontSize="18px" fontWeight="bold">
            Список параметров, по которым вы будете получать уведомления
          </CustomTyphography>
          <div className={styles.list}>
            <CustomFlex direction="column" justify="center" gap="10px">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
              ))}
              <CustomButton
                variant="tertiary"
                padding="small"
                stretched
                isText={false}
                onClick={handleAddNotification}
              >
                <CustomFlex justify="center" gap="10px">
                  <PlusIcon size={16} />
                  <CustomTyphography fontSize="14px" fontWeight="medium">
                    Добавить ещё
                  </CustomTyphography>
                </CustomFlex>
              </CustomButton>
            </CustomFlex>
          </div>
        </div>
      )}
      <Notification />
    </>
  );
}
