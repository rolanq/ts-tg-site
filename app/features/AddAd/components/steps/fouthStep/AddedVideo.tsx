import React, { useEffect, useState, useRef } from "react";
import styles from "./FourthStep.module.css";
import CloseIcon from "@/app/shared/Icons/CloseIcon";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";

interface AddedVideoProps {
  video: File;
  setVideo: React.Dispatch<React.SetStateAction<File | null>>;
}

const SUPPORTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

export const AddedVideo = ({ video, setVideo }: AddedVideoProps) => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const validateVideoFormat = (file: File): boolean => {
    if (!SUPPORTED_VIDEO_TYPES.includes(file.type)) {
      setError(
        `Неподдерживаемый формат видео. Поддерживаемые форматы: MP4, WebM, OGG`
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    let objectUrl = "";
    setIsLoading(true);

    try {
      const isFromTelegram = video.name.startsWith("https");

      if (!isFromTelegram && !validateVideoFormat(video)) {
        return;
      }

      objectUrl = isFromTelegram ? video.name : URL.createObjectURL(video);

      // Проверяем, что URL действительно создался
      if (!objectUrl) {
        throw new Error("Не удалось создать ссылку на видео");
      }

      setVideoUrl(objectUrl);
      setError(null);
    } catch (err) {
      console.error("Error creating video URL:", err);
      setError(
        err instanceof Error ? err.message : "Ошибка при загрузке видео"
      );
    } finally {
      setIsLoading(false);
    }

    return () => {
      if (objectUrl && !objectUrl.startsWith("https")) {
        try {
          URL.revokeObjectURL(objectUrl);
        } catch (err) {
          console.error("Error cleaning up video URL:", err);
        }
      }
    };
  }, [video]);

  const handleDeleteVideo = () => {
    if (videoUrl && !videoUrl.startsWith("https")) {
      try {
        URL.revokeObjectURL(videoUrl);
      } catch (err) {
        console.error("Error cleaning up video URL on delete:", err);
      }
    }
    setVideo(null);
  };

  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    const videoElement = e.target as HTMLVideoElement;
    let errorMessage = "Не удалось воспроизвести видео";

    if (videoElement.error) {
      switch (videoElement.error.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          errorMessage = "Воспроизведение прервано";
          break;
        case MediaError.MEDIA_ERR_NETWORK:
          errorMessage = "Ошибка сети при загрузке видео";
          break;
        case MediaError.MEDIA_ERR_DECODE:
          errorMessage = "Не удалось декодировать видео";
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMessage = "Формат видео не поддерживается";
          break;
      }
    }

    setError(errorMessage);
    console.error("Video error:", errorMessage);
  };

  const handleVideoLoad = () => {
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className={styles.addedImageWrapper}>
      {isLoading ? (
        <CustomTyphography
          fontSize="14px"
          fontWeight="light"
          color="gray"
          className={styles.addedImage}
        >
          Загрузка видео...
        </CustomTyphography>
      ) : error ? (
        <CustomTyphography
          fontSize="14px"
          fontWeight="light"
          color="red"
          className={styles.addedImage}
        >
          {error}
        </CustomTyphography>
      ) : (
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          className={styles.addedImage}
          height={100}
          width={125}
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
          preload="metadata"
        />
      )}
      <button onClick={handleDeleteVideo} className={styles.closeIcon}>
        <CloseIcon />
      </button>
    </div>
  );
};
