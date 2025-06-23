import { INotification } from "@/app/db/db";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import React, { useContext } from "react";
import styles from "./NotificationCard.module.css";
import TrashIcon from "@/app/shared/Icons/TrashIcon";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import EditIcon from "@/app/shared/Icons/EditIcon";
import { NotificationsContext } from "@/app/context/NotificationsContext";
import { deleteNotification } from "@/app/services/Notifications";

export default function NotificationCard({
  notification,
}: {
  notification: INotification;
}) {
  const { setNotification, refetch } = useContext(NotificationsContext);

  const handleEdit = () => {
    setNotification(notification);
  };

  const handleDelete = () => {
    if (notification.id) {
      deleteNotification(notification.id);
      refetch();
    }
  };

  return (
    <button className={styles.card}>
      <CustomFlex justify="space-between" align="center">
        <CustomFlex direction="column" gap="10px">
          <CustomTyphography fontSize="16px" fontWeight="bold">
            {notification.Region?.name}
            {notification.Region?.name && notification.Brand?.name && ", "}
            {notification.Brand?.name}
          </CustomTyphography>
          {notification.priceFrom || notification.priceTo ? (
            <CustomTyphography fontSize="14px" fontWeight="medium">
              {notification.priceFrom && `Цена от: ${notification.priceFrom}`}
              {notification.priceFrom && notification.priceTo && " - "}
              {notification.priceTo && `до: ${notification.priceTo}`}
            </CustomTyphography>
          ) : (
            <CustomTyphography fontSize="14px" fontWeight="medium">
              Любая цена
            </CustomTyphography>
          )}
        </CustomFlex>
        <div className={styles.buttons}>
          <CustomButton
            variant="plain"
            padding="small"
            isText={false}
            onClick={handleEdit}
          >
            <EditIcon />
          </CustomButton>
          <CustomButton
            variant="plain"
            padding="small"
            isText={false}
            onClick={handleDelete}
          >
            <TrashIcon />
          </CustomButton>
        </div>
      </CustomFlex>
    </button>
  );
}
