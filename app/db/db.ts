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

export interface ModelWithAssociate<T extends Model> extends ModelStatic<T> {
  associate?: (models: any) => void;
}

// Инициализируем модели
export const Advertisement: ModelWithAssociate<Model<IAdvertisement>> =
  dbAdvertisement(sequelize, Sequelize);
export const Brand: ModelWithAssociate<Model<IBrand>> = dbBrand(
  sequelize,
  Sequelize
);
export const CarModel: ModelWithAssociate<Model<ICarModel>> = dbCarModel(
  sequelize,
  Sequelize
);
export const Region: ModelWithAssociate<Model<IRegion>> = dbRegion(
  sequelize,
  Sequelize
);
export const SavedSearch: ModelWithAssociate<Model<ISavedSearch>> =
  dbSavedSearch(sequelize, Sequelize);
export const AdvertisementDraft: ModelWithAssociate<
  Model<IAdvertisementDraft>
> = dbAdvertisementDraft(sequelize, Sequelize);
export const User: ModelWithAssociate<Model<IUser>> = dbUser(
  sequelize,
  Sequelize
);
export const Notification: ModelWithAssociate<Model<INotification>> =
  dbNotification(sequelize, Sequelize);

// Создаем объект с моделями для ассоциаций
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

// Инициализируем ассоциации
Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

export interface IBrand {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICarModel {
  id?: number;
  name: string;
  brandId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRegion {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IChannelMessage {
  id: number;
  channelId: string;
  messageId: number;
  advertisementId: number;
  createdAt?: Date;
  updatedAt?: Date;
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
  userId?: string;
  brandId?: number | null;
  regionId?: number | null;
  priceFrom?: number | null;
  priceTo?: number | null;
  createdAt?: Date;
  updatedAt?: Date;

  Brand?: IBrand;
  Region?: IRegion;
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
