import { IAdvertisement, SavedSearch } from "../db/db";
import { TELEGRAM_API_URL } from "../shared/constants/telegram";
import { addWatermark } from "../shared/utils/addWatermark";
import { renderAdvertismentMessage } from "../shared/utils/clientUtils";
import { Model, Op } from "sequelize";
import { getSavedSearchesByAd } from "./SavedSearch";

interface ISavedSearch {
  id?: number;
  userId: string;
  regionId?: number | null;
  brandId?: number | null;
  priceFrom?: number | null;
  priceTo?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type Media = {
  type: "photo" | "video";
  media: string;
  caption?: string;
};

export const sendPhotos = async (files: File[]) => {
  const mediaGroupPromises = files.map(async (photo) => {
    const formData = new FormData();
    // const watermarkedPhoto = await addWatermark(photo);
    formData.append("photo", photo);
    formData.append("chat_id", process.env.NEXT_PUBLIC_PHOTOS_CHANNEL_ID!);

    const response = await fetch(`${TELEGRAM_API_URL}/sendPhoto`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.result.photo[data.result.photo.length - 1].file_id;
  });

  const fileIds = await Promise.all(mediaGroupPromises);

  return fileIds;
};

export const sendVideo = async (file: File) => {
  const formData = new FormData();
  const blob = new Blob([file], { type: file.type });
  formData.append("video", blob);
  formData.append("chat_id", process.env.NEXT_PUBLIC_PHOTOS_CHANNEL_ID!);

  const response = await fetch(`${TELEGRAM_API_URL}/sendVideo`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.result.video.file_id;
};

export const sendAdToChannel = async (ad: IAdvertisement) => {
  if (ad.photos?.length || ad.video) {
    const messageId = await sendMedia(ad);
    return messageId;
  }

  const messageId = await sendText(ad);
  return messageId;
};

const sendMedia = async (ad: IAdvertisement) => {
  const message = renderAdvertismentMessage(ad);
  const formData = new FormData();
  const media: Media[] = [];

  if (ad.video) {
    media.push({
      type: "video",
      media: ad.video,
    });
  }
  if (ad.photos?.length) {
    ad.photos.forEach((photo) => {
      media.push({
        type: "photo",
        media: photo,
      });
    });
  }

  if (media.length > 0) {
    media[0].caption = message;
  }
  formData.append("media", JSON.stringify(media));
  formData.append("message_text", message);
  formData.append("chat_id", process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_ID!);

  const response = await fetch(`${TELEGRAM_API_URL}/sendMediaGroup`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.result.message_id;
};

const sendText = async (ad: IAdvertisement) => {
  const message = renderAdvertismentMessage(ad);
  const formData = new FormData();

  formData.append("chat_id", process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_ID!);
  formData.append("text", message);

  const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  return data.result.message_id;
};

export const editAdInChannel = async (ad: IAdvertisement) => {
  const message = renderAdvertismentMessage(ad);
  if (!ad.channelMessageId) {
    return;
  }

  const formData = new FormData();
  formData.append("chat_id", process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_ID!);
  formData.append("message_id", ad.channelMessageId.toString());
  formData.append("text", message);

  const response = await fetch(`${TELEGRAM_API_URL}/editMessageText`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.result.message_id;
};

export const sendNotifications = async (ad: IAdvertisement) => {
  try {
    const matchingSavedSearches = await getSavedSearchesByAd(ad);
    console.log("matchingSavedSearches", matchingSavedSearches);

    const notificationPromises = matchingSavedSearches.map(
      async (savedSearch) => {
        const formData = new FormData();
        const userId = savedSearch.userId;
        formData.append("chat_id", userId);
        formData.append(
          "text",
          "По вашему сохраненному поиску появилось новое объявление"
        );
        formData.append(
          "reply_markup",
          JSON.stringify({
            inline_keyboard: [
              [
                {
                  text: "🚗 Посмотреть",
                  web_app: { url: `https://vkasanie.com/?ad=${ad.id}` },
                },
              ],
            ],
          })
        );

        return fetch(`${TELEGRAM_API_URL}/sendMessage`, {
          method: "POST",
          body: formData,
        });
      }
    );

    const responses = await Promise.all(notificationPromises);
    console.log(responses);
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};
