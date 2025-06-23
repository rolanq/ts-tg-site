"use server";

import {
  Brand,
  IAdvertisement,
  IBrand,
  INotification,
  IRegion,
  Notification,
  Region,
  SavedSearch,
} from "../db/db";
import { getWhereConditionForNotification } from "../shared/utils/utils";

export async function getNotifications(
  userId: number
): Promise<INotification[]> {
  try {
    const notifications = await Notification.findAll({
      where: {
        userId: String(userId),
      },
    });

    const jsonNotifications = notifications.map((notification) =>
      notification.toJSON()
    );

    for (const notification of jsonNotifications) {
      if (notification.brandId) {
        const brand = await Brand.findByPk(notification.brandId);
        notification.Brand = brand?.toJSON() as IBrand;
      }
      if (notification.regionId) {
        const region = await Region.findByPk(notification.regionId);
        notification.Region = region?.toJSON() as IRegion;
      }
    }

    return jsonNotifications;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function updateOrCreateNotification(
  notification: Partial<INotification | null>,
  id?: number
): Promise<INotification> {
  if (!id) {
    const newNotification = await Notification.create({
      ...notification,
    });
    return newNotification.toJSON() as INotification;
  }

  const existingNotification = await Notification.findByPk(id);

  if (!existingNotification || !notification) {
    throw new Error("Notification not found");
  }

  const updatedNotification = await existingNotification.update(notification);

  return updatedNotification.toJSON() as INotification;
}

export async function deleteNotification(id: number) {
  const notification = await Notification.findByPk(id);
  if (!notification) {
    throw new Error("Notification not found");
  }
  await notification.destroy();
}
export const getNotificationsByAd = async (ad: IAdvertisement) => {
  const where = getWhereConditionForNotification(ad);

  const matchingNotifications = await Notification.findAll({
    where: {
      ...where,
    },
  });

  return matchingNotifications.map((notification) => notification.toJSON());
};

export const disableNotifications = async (userId: number) => {
  await Notification.destroy({
    where: {
      userId: String(userId),
    },
  });
};