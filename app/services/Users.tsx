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

  return {
    adCount: formattedAdvertisements.length,
    adsOnHold: formattedAdvertisements.filter((ad) => ad.isOnHold).length,
    activeAdsCount: formattedAdvertisements.filter((ad) => ad.isActive).length,
    soldCount: formattedAdvertisements.filter((ad) => !ad.isActive).length,
    totalEarnings: formattedAdvertisements.reduce(
      (acc, ad) => acc + Number(ad.price),
      0
    ),
  };
};
