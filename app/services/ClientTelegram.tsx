import { TELEGRAM_API_URL } from "../shared/constants/telegram";

export const sendPhotos = async (files: File[]) => {
  const mediaGroupPromises = files.map(async (photo) => {
    const formData = new FormData();
    const blob = new Blob([photo], { type: photo.type });
    formData.append("photo", blob);
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
