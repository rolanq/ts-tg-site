import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import React, { useRef, useState, useEffect } from "react";
import commonStyles from "../../commonSteps.module.css";
import styles from "./FourthStep.module.css";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { AddedImage } from "./AddedImage";

export const FourthStep = () => {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleAddPhoto = () => {
    if (photoInputRef.current) {
      photoInputRef.current.click();
    }
  };

  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setPhotos((prev) => {
        const newFiles = Array.from(files);
        // Фильтруем новые файлы, чтобы не было файлов с одинаковым именем
        const filteredNewFiles = newFiles.filter(
          (file) => !prev.some((prevFile) => prevFile.name === file.name)
        );
        return [...prev, ...filteredNewFiles];
      });
    }
  };

  const handleChangeVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setVideo(files[0]); // всегда только одно видео
    }
  };

  useEffect(() => {
    if (!video) {
      setVideoPreview(null);
      return;
    }
    const url = URL.createObjectURL(video);
    const videoElement = document.createElement("video");
    videoElement.src = url;
    videoElement.crossOrigin = "anonymous";
    videoElement.muted = true;
    videoElement.currentTime = 0.1; // чуть дальше старта, чтобы точно был кадр
    videoElement.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        setVideoPreview(canvas.toDataURL("image/png"));
      }
      URL.revokeObjectURL(url);
    });
    // Очистка
    return () => {
      setVideoPreview(null);
      URL.revokeObjectURL(url);
    };
  }, [video]);

  return (
    <CustomFlex
      direction="column"
      gap="10px"
      className={commonStyles.stepCommon}
    >
      <CustomTyphography fontSize="18px" fontWeight="bold">
        Фото и видео
      </CustomTyphography>

      <CustomFlex
        direction="column"
        gap="10px"
        className={commonStyles.stepCommonBody}
      >
        <div className={styles.input}>
          <input
            type="file"
            ref={photoInputRef}
            onChange={handleChangePhoto}
            multiple
            accept="image/*"
          />
        </div>

        <CustomFlex
          align="center"
          justify="center"
          className={styles.photosWrapper}
        >
          {videoPreview || photos.length > 0 ? (
            <CustomFlex gap="10px">
              {videoPreview && (
                <img
                  src={videoPreview}
                  alt="Видео превью"
                  width={100}
                  height={100}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />
              )}
              {photos.map((photo, index) => (
                <AddedImage
                  key={photo.name}
                  photo={photo}
                  index={index}
                  setPhotos={setPhotos}
                />
              ))}
            </CustomFlex>
          ) : (
            <CustomTyphography fontSize="14px" fontWeight="light" color="gray">
              Фото и видео не добавлены
            </CustomTyphography>
          )}
        </CustomFlex>

        <CustomButton onClick={handleAddPhoto} className={styles.addButton}>
          Добавить фото
        </CustomButton>

        <div className={styles.input}>
          <input type="file" accept="video/*" onChange={handleChangeVideo} />
        </div>
      </CustomFlex>
    </CustomFlex>
  );
};
