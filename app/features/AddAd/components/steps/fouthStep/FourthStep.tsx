import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import React, { useRef, useContext, useState } from "react";
import commonStyles from "../../commonSteps.module.css";
import styles from "./FourthStep.module.css";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { AddedImage } from "./AddedImage";
import { AddedVideo } from "./AddedVideo";
import { AddAdContext } from "../../../../../context/AddAdContext";

export const FourthStep = () => {
  const { preparedVideo, setPreparedVideo, preparedPhotos, setPreparedPhotos } =
    useContext(AddAdContext);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handleAddPhoto = () => {
    if (photoInputRef.current) {
      photoInputRef.current.click();
    }
  };

  const validateVideo = async (file: File): Promise<boolean> => {
    if (file.size > 10 * 1024 * 1024) {
      setVideoError("Размер видео не должен превышать 10 МБ");
      return false;
    }

    const video = document.createElement("video");
    video.preload = "metadata";

    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        if (video.duration > 60) {
          setVideoError("Длительность видео не должна превышать 1 минуту");
          resolve(false);
        }
        resolve(true);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const validatePhoto = (file: File): boolean => {
    if (file.size > 10 * 1024 * 1024) {
      setPhotoError("Размер фото не должен превышать 10 МБ");
      return false;
    }
    return true;
  };

  const handleChangePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setVideoError(null);
    setPhotoError(null);

    if (files) {
      const isVideo = files.item(0)?.type.startsWith("video");
      if (isVideo) {
        const file = files.item(0) as File;
        const isValid = await validateVideo(file);
        if (isValid) {
          setPreparedVideo(file);
        }
        return;
      } else {
        const newFiles = Array.from(files);
        const validFiles = newFiles.filter((file) => {
          const isValidSize = validatePhoto(file);
          const isDuplicate = preparedPhotos.some(
            (prevFile) => prevFile.name === file.name
          );
          return isValidSize && !isDuplicate;
        });

        if (validFiles.length > 0) {
          setPreparedPhotos((prev) => [...prev, ...validFiles]);
        }
      }
    }
  };

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
            accept={".jpg, .jpeg, .png, .mp4"}
          />
        </div>

        <CustomFlex
          direction="column"
          align="center"
          justify="center"
          className={styles.photosWrapper}
          height="280px"
        >
          {preparedVideo || preparedPhotos.length > 0 ? (
            <CustomFlex gap="10px" direction="column">
              {preparedVideo && (
                <CustomFlex direction="column" gap="5px">
                  <CustomTyphography
                    fontSize="14px"
                    fontWeight="light"
                    color={videoError ? "red" : "gray"}
                  >
                    {videoError ||
                      "Не более 1 видео, не более 10 МБ, длительность до 1 минуты"}
                  </CustomTyphography>
                  {preparedVideo && (
                    <AddedVideo
                      video={preparedVideo}
                      setVideo={setPreparedVideo}
                    />
                  )}
                </CustomFlex>
              )}

              {preparedPhotos.length > 0 && (
                <div className={styles.photosScroll}>
                  <CustomFlex direction="column" gap="5px">
                    <CustomTyphography
                      fontSize="14px"
                      fontWeight="light"
                      color={photoError ? "red" : "gray"}
                    >
                      {photoError ||
                        "Не более 9 фото, размер каждого не более 10 МБ"}
                    </CustomTyphography>
                    <CustomFlex gap="5px">
                      {preparedPhotos.map((photo, index) => (
                        <AddedImage
                          key={photo.name + index}
                          photo={photo}
                          index={index}
                          setPhotos={setPreparedPhotos}
                        />
                      ))}
                    </CustomFlex>
                  </CustomFlex>
                </div>
              )}
            </CustomFlex>
          ) : (
            <CustomFlex
              direction="column"
              gap="10px"
              align="center"
              justify="center"
              onClick={handleAddPhoto}
            >
              <CustomTyphography
                fontSize="16px"
                fontWeight="light"
                color="gray"
              >
                Фото и видео не добавлены
              </CustomTyphography>
              <CustomButton stretched variant="tertiary">
                Добавить
              </CustomButton>
            </CustomFlex>
          )}
        </CustomFlex>
        {(preparedPhotos.length > 0 || preparedVideo) && (
          <CustomButton stretched variant="tertiary" onClick={handleAddPhoto}>
            Добавить ещё
          </CustomButton>
        )}

        <CustomTyphography
          fontSize="14px"
          fontWeight="light"
          color="gray"
          textAlign="justify"
        >
          Советуем добавить, так ваше объявление будет более привлекательным для
          покупателей :)
        </CustomTyphography>
      </CustomFlex>
    </CustomFlex>
  );
};
