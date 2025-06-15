import { IAdvertisementDraft } from "@/app/db/db";
import { STEPS_ENUM } from "../types/config";

export const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_BOT_TOKEN;
export const TELEGRAM_PHOTOS_CHANNEL_ID =
  process.env.NEXT_PUBLIC_PHOTOS_CHANNEL_ID;

export const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export const TELEGRAM_FILE_API_URL = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}`;

export const DEFAULT_AD_DRAFT: IAdvertisementDraft = {
  userId: '0',
  telegramUsername: '',
  regionId: null,
  brandId: null,
  modelId: null,
  engineType: null,
  horsePower: null,
  driveType: null,
  transmission: null,
  year: null,
  price: null,
  mileage: null,
  description: null,
  phoneNumber: null,
  photos: [],
  currentStep: STEPS_ENUM.REGION,
  autotekaLink: null,
  video: null,
}