import { IAdvertisement } from "../db/db";
import { TELEGRAM_API_URL } from "../shared/constants/telegram";
import { renderAdvertismentMessage } from "../shared/utils/clientUtils";
import { getNotificationsByAd } from "./Notifications";

const channelId = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_ID!;
const photosChannelId = process.env.NEXT_PUBLIC_PHOTOS_CHANNEL_ID!;
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
    formData.append("chat_id", photosChannelId);

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
  formData.append("chat_id", channelId);

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

const sendMedia = async (
  ad: IAdvertisement,
  chatId?: string,
  appendText?: string,
  keyboard?: {
    text: string;
    web_app: {
      url: string;
    };
  }[][]
) => {
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
    media[0].caption = `${appendText ? appendText + "\n" : ""}${message}`;
  }
  formData.append("media", JSON.stringify(media));
  formData.append(
    "message_text",
    `${appendText ? appendText + "\n" : ""}${message}`
  );
  formData.append("chat_id", chatId || channelId);
  formData.append("parse_mode", "HTML");
  if (keyboard) {
    formData.append(
      "reply_markup",
      JSON.stringify({ inline_keyboard: keyboard })
    );
  }
  const response = await fetch(`${TELEGRAM_API_URL}/sendMediaGroup`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.result.message_id;
};

const sendText = async (
  ad: IAdvertisement,
  chatId?: string,
  appendText?: string,
  keyboard?: {
    text: string;
    web_app: {
      url: string;
    };
  }[][]
) => {
  const message = renderAdvertismentMessage(ad);
  const formData = new FormData();

  formData.append("chat_id", chatId || channelId);
  formData.append("text", `${appendText ? appendText + "\n\n" : ""}${message}`);
  formData.append("parse_mode", "HTML");
  if (keyboard) {
    formData.append(
      "reply_markup",
      JSON.stringify({ inline_keyboard: keyboard })
    );
  }
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
  formData.append("chat_id", channelId);
  formData.append("message_id", ad.channelMessageId.toString());
  formData.append("text", message);

  const response = await fetch(`${TELEGRAM_API_URL}/editMessageText`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.result.message_id;
};

const sendNotificationBatch = async (
  notifications: { userId?: string; ad: IAdvertisement }[]
) => {
  const keyboard = (ad: IAdvertisement) => [
    [
      {
        text: "🚗 Посмотреть",
        web_app: { url: `https://vkasanie.com/?ad=${ad.id}` },
      },
    ],
    [
      {
        text: "Выключить уведомления",
        web_app: {
          url: `https://vkasanie.com/profile?user_opened=true`,
        },
      },
    ],
  ];
  const promises = notifications.map(async ({ userId, ad }) => {
    if (!userId) {
      return;
    }

    if (ad.photos?.length || ad.video) {
      const messageId = await sendMedia(
        ad,
        userId,
        "По вашему сохраненному поиску появилось новое объявление",
        keyboard(ad)
      );
      return messageId;
    }

    const messageId = await sendText(
      ad,
      userId,
      "По вашему сохраненному поиску появилось новое объявление",
      keyboard(ad)
    );
    return messageId;

    // const formData = new FormData();
    // formData.append("chat_id", userId);
    // formData.append(
    //   "text",
    //   "По вашему сохраненному поиску появилось новое объявление"
    // );
    // formData.append(
    //   "reply_markup",
    //   JSON.stringify({
    //     inline_keyboard: [
    //       [
    //         {
    //           text: "🚗 Посмотреть",
    //           web_app: { url: `https://vkasanie.com/?ad=${ad.id}` },
    //         },
    //       ],
    //       [
    //         {
    //           text: "Выключить уведомления",
    //           web_app: { url: `https://vkasanie.com/profile?user_opened=true` },
    //         },
    //       ],
    //     ],
    //   })
    // );

    // return fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    //   method: "POST",
    //   body: formData,
    // });
  });

  await Promise.all(promises);
};

export const sendNotifications = async (ad: IAdvertisement) => {
  try {
    const matchingNotifications = await getNotificationsByAd(ad);
    const BATCH_SIZE = 10;
    const DELAY = 1500;

    const notifications = matchingNotifications.map((notification) => ({
      userId: notification.userId,
      ad,
    }));

    for (let i = 0; i < notifications.length; i += BATCH_SIZE) {
      const batch = notifications.slice(i, i + BATCH_SIZE);
      await sendNotificationBatch(batch);

      if (i + BATCH_SIZE < notifications.length) {
        await new Promise((resolve) => setTimeout(resolve, DELAY));
      }
    }
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};
