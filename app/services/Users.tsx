"use server";
import React from "react";
import { TelegramUser } from "../shared/types/telegram";
import { Advertisement, User } from "../db/db";
import { USER_STATE_ENUM } from "../shared/types/config";

export default async function createUser(user: TelegramUser) {
  const existingUser = await User.findOne({
    where: {
      id: user.id.toString(),
    },
  });

  if (existingUser) {
    return existingUser.toJSON();
  } else {
    const createdUser = await User.create({
      id: user.id.toString(),
      username: user.username || "Аноним",
      state: USER_STATE_ENUM.MENU,
      availableListings: 0,
      isAdmin: false,
      isBanned: false,
    });

    return createdUser.toJSON();
  }
}

export const getStatisticsByUserId = async (userId: string) => {
  const allAdvertisements = await Advertisement.findAll({
    where: { userId },
  });

  const formattedAdvertisements = allAdvertisements.map((ad) =>
    ad.get({ plain: true })
  );

  const stats = formattedAdvertisements.reduce(
    (acc, ad) => {
      if (ad.isOnHold) {
        acc.adsOnHold++;
      }
      if (ad.isActive) {
        acc.activeAdsCount++;
      }
      if (!ad.isActive) {
        acc.soldCount++;
      }

      if (!ad.isActive) {
        acc.totalEarnings += Number(ad.price);
      }

      return acc;
    },
    {
      adCount: 0,
      adsOnHold: 0,
      activeAdsCount: 0,
      soldCount: 0,
      totalEarnings: 0,
    }
  );

  return stats;
};
