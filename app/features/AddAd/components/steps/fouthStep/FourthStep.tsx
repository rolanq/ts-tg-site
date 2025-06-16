import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import React, { useRef, useState, useEffect, useContext } from "react";
import commonStyles from "../../commonSteps.module.css";
import styles from "./FourthStep.module.css";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { AddedImage } from "./AddedImage";
import { AddedVideo } from "./AddedVideo";
import { AddAdContext } from "../../../context/AddAdContext";

export const FourthStep = () => {
  const {
    setPreparedData,
    preparedVideo,
    setPreparedVideo,
    preparedPhotos,
    setPreparedPhotos,
  } = useContext(AddAdContext);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handleAddPhoto = () => {
    if (photoInputRef.current) {
      photoInputRef.current.click();
    }
  };

  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const isVideo = files.item(0)?.type.startsWith("video");
      if (isVideo) {
        setPreparedVideo(files.item(0) as File);
        return;
      } else {
        setPreparedPhotos((prev) => {
          const newFiles = Array.from(files);
          const filteredNewFiles = newFiles.filter(
            (file) => !prev.some((prevFile) => prevFile.name === file.name)
          );
          return [...prev, ...filteredNewFiles];
        });
      }
    }
  };

  useEffect(() => {
    setPreparedData((prev) => ({
      ...prev,
    }));
  }, [preparedPhotos, preparedVideo]);

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
                    color="gray"
                  >
                    Не более 1 видео
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
                      color="gray"
                    >
                      Не более 9 фото
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
