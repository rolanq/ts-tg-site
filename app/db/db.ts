// @ts-nocheck
import { STEPS_ENUM, USER_STATE_ENUM, HIDE_REASONS } from "../types/config";
import { Model, ModelStatic, Sequelize } from "sequelize";
import dbAdvertisement from "./models/advertisement.cjs";
import dbBrand from "./models/brand.cjs";
import dbCarModel from "./models/carModel.cjs";
import dbRegion from "./models/region.cjs";
import dbSavedSearch from "./models/savedSearch.cjs";
import dbAdvertisementDraft from "./models/advertisementDraft.cjs";
import dbUser from "./models/user.cjs";
import dbNotification from "./models/notification.cjs";
import dbBotSettings from "./models/botSettings.cjs";
import pg from "pg";

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
});

export async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log("База данных успешно подключена.");

    // Синхронизация моделей с базой данных
    await sequelize.sync({ alter: true });
    console.log("Модели синхронизированы с базой данных.");
  } catch (error) {
    console.error("Ошибка при инициализации базы данных:", error);
    throw error;
  }
}

export interface IBrand {
  id?: number;
  name: string;
}

export interface ICarModel {
  id?: number;
  name: string;
  brandId: number;
}

export interface IRegion {
  id: number;
  name: string;
}

export interface IChannelMessage {
  id: number;
  channelId: string;
  messageId: number;
  advertisementId: number;
}

export interface IUser {
  id: string;
  username: string;
  state: USER_STATE_ENUM;
  availableListings: number;
  isAdmin: boolean;
  isBanned: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAdvertisement {
  id?: number;
  regionId: number;
  brandId: number;
  modelId: number;
  engineType: string;
  horsePower: number;
  driveType: string;
  transmission: string;
  year: number;
  mileage: number;
  description: string;
  price: number;
  phoneNumber: string;
  telegramUsername?: string;
  autotekaLink: string | null;
  photos: string[];
  video: string | null;
  isActive: boolean;
  isOnHold: boolean;
  hideReason: HIDE_REASONS | null;
  userId: string;
  channelMessageId: number | null;
  channelText: string | null;
  channelStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAdvertisementDraft {
  id?: number;
  regionId: number | null;
  brandId: number | null;
  modelId: number | null;
  engineType: string | null;
  horsePower: number | null;
  driveType: string | null;
  transmission: string | null;
  year: number | null;
  mileage: number | null;
  description: string | null;
  price: number | null;
  phoneNumber: string | null;
  photos: string[];
  currentStep: STEPS_ENUM;
  telegramUsername?: string;
  userId: string;
  autotekaLink: string | null;
  video: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISavedSearch {
  id?: number;
  userId: string;
  brandId: number | null;
  regionId: number | null;
  priceFrom: number | null;
  priceTo: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INotification {
  id?: number;
  userId: string;
  brandId: number | null;
  regionId: number | null;
  priceFrom: number | null;
  priceTo: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessageToDelete {
  id?: number;
  userId: string;
  messagesToDelete: number[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBotSettings {
  id?: number;
  WatermarkText: string;
  SupportUsername: string;
  SupportText: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Advertisement: ModelStatic<Model<IAdvertisement>> =
  dbAdvertisement(sequelize, Sequelize);
export const Brand: ModelStatic<Model<IBrand>> = dbBrand(sequelize, Sequelize);
export const CarModel: ModelStatic<Model<ICarModel>> = dbCarModel(
  sequelize,
  Sequelize
);
export const Region: ModelStatic<Model<IRegion>> = dbRegion(
  sequelize,
  Sequelize
);
export const SavedSearch: ModelStatic<Model<ISavedSearch>> = dbSavedSearch(
  sequelize,
  Sequelize
);
export const AdvertisementDraft: ModelStatic<Model<IAdvertisementDraft>> =
  dbAdvertisementDraft(sequelize, Sequelize);
export const User: ModelStatic<Model<IUser>> = dbUser(sequelize, Sequelize);
export const Notification: ModelStatic<Model<INotification>> = dbNotification(
  sequelize,
  Sequelize
);
export const BotSettings: ModelStatic<Model<IBotSettings>> = dbBotSettings(
  sequelize,
  Sequelize
);
