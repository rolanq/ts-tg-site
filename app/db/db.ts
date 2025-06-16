import {
  STEPS_ENUM,
  USER_STATE_ENUM,
  HIDE_REASONS,
} from "../shared/types/config";
import { Model, ModelStatic, Sequelize } from "sequelize";
import pg from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
});

// Динамический импорт моделей
const dbAdvertisement = require("../../db/models/advertisement.cjs");
const dbBrand = require("../../db/models/brand.cjs");
const dbCarModel = require("../../db/models/carModel.cjs");
const dbRegion = require("../../db/models/region.cjs");
const dbSavedSearch = require("../../db/models/savedSearch.cjs");
const dbAdvertisementDraft = require("../../db/models/advertisementDraft.cjs");
const dbUser = require("../../db/models/user.cjs");
const dbNotification = require("../../db/models/notification.cjs");

export interface ModelWithAssociate extends ModelStatic<Model<any>> {
  associate?: (models: any) => void;
}

// Экспортируем модели
export const Advertisement: ModelWithAssociate = dbAdvertisement(
  sequelize,
  Sequelize
);
export const Brand: ModelWithAssociate = dbBrand(sequelize, Sequelize);
export const CarModel: ModelWithAssociate = dbCarModel(sequelize, Sequelize);
export const Region: ModelWithAssociate = dbRegion(sequelize, Sequelize);
export const SavedSearch: ModelWithAssociate = dbSavedSearch(
  sequelize,
  Sequelize
);
export const AdvertisementDraft: ModelWithAssociate = dbAdvertisementDraft(
  sequelize,
  Sequelize
);
export const User: ModelWithAssociate = dbUser(sequelize, Sequelize);
export const Notification: ModelWithAssociate = dbNotification(
  sequelize,
  Sequelize
);

export async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log("База данных успешно подключена.");

    // Инициализация связей между моделями
    const models = {
      Advertisement,
      Brand,
      CarModel,
      Region,
      SavedSearch,
      AdvertisementDraft,
      User,
      Notification,
    };

    // Вызываем метод associate для каждой модели
    Object.values(models).forEach((model) => {
      if (model.associate) {
        model.associate(models);
      }
    });

    // Синхронизация моделей с базой данных
    await sequelize.sync({ alter: true });
    console.log("Модели синхронизированы с базой данных.");

    return models;
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
  createdAt?: Date | string;
  updatedAt?: Date | string;
  Brand?: IBrand;
  Region?: IRegion;
  CarModel?: ICarModel;
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

  Brand?: IBrand;
  Region?: IRegion;
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
