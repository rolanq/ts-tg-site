"use server";
import React from "react";
import { TelegramUser } from "../shared/types/telegram";
import { User } from "../db/db";
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
