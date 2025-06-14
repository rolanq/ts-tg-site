"use client";
import { IAdvertisement } from "@/app/db/db";
import { CustomBottomSheet } from "@/app/shared/kit/CustomBottomSheet/CustomBottomSheet";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import React, { useEffect, useMemo, useState } from "react";
import { ImageContainer } from "../ImageContainer/ImageContainer";
import CustomSlider from "@/app/shared/kit/CustomSlider/CustomSlider";
import styles from "./Ad.module.css";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import classNames from "classnames";

interface Image {
  url: string;
  file_id: string;
}

interface AdProps {
  ad?: IAdvertisement;
  setAd: (ad: IAdvertisement | undefined) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Ad = ({ ad, setAd, isOpen, setIsOpen }: AdProps) => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    if (!ad) return;

    ad.photos.forEach((photo) => {
      fetch(
        `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/getFile?file_id=${photo}`
      )
        .then((res) => res.json())
        .then((fileData) => {
          if (!fileData.ok) {
            console.error("Ошибка получения информации о файле:", fileData);
            return;
          }

          const filePath = fileData.result.file_path;
          setImages((prev) => [
            ...prev,
            {
              url: `https://api.telegram.org/file/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/${filePath}`,
              file_id: photo,
            },
          ]);
        });
    });
  }, [ad]);

  const onDismiss = () => {
    setIsOpen(false);
    setAd(undefined);
    setImages([]);
  };

  const renderImages = useMemo(() => {
    return images.map((image) => (
      <div className={styles.imageContainer}>
        <ImageContainer
          key={image.file_id}
          image={image.url}
          className={styles.image}
          width={300}
          height={300}
          borderRadius={0}
        />
        <div
          className={styles.backgroundImage}
          style={{
            backgroundImage: `url(${image.url})`,
          }}
        />
      </div>
    ));
  }, [images]);

  return (
    <CustomBottomSheet
      open={isOpen}
      onDismiss={onDismiss}
      snap={95}
      disableDragClose
      footer={
        <CustomFlex direction="row" gap="10px">
          <CustomButton
            onClick={() => {}}
            className={classNames(styles.footerButtons, styles.messageButton)}
          >
            Написать
          </CustomButton>
          {ad?.phoneNumber && (
            <CustomButton
              onClick={() => {}}
              className={classNames(styles.footerButtons, styles.callButton)}
            >
              Позвонить
            </CustomButton>
          )}
        </CustomFlex>
      }
    >
      <div className={styles.adContainer}>
        <div className={styles.imagesContainer}>
          <CustomSlider items={renderImages} />
        </div>
        <div className={styles.adInfoContainer}>
          <CustomFlex direction="column" gap="10px">
            <CustomTyphography fontSize="20px" fontWeight="bold">
              {ad?.Brand?.name} {ad?.CarModel?.name} {ad?.year} г.
            </CustomTyphography>
          </CustomFlex>
          <div className={styles.adInfoGrid}>
            <CustomTyphography fontSize="16px" fontWeight="medium" color="gray">
              Регион
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium">
              {ad?.Region?.name}
            </CustomTyphography>

            <CustomTyphography fontSize="16px" fontWeight="medium" color="gray">
              Двигатель
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium">
              {ad?.engineType}, {ad?.horsePower} л.с.
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium" color="gray">
              Привод
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium">
              {ad?.transmission}
            </CustomTyphography>

            <CustomTyphography fontSize="16px" fontWeight="medium" color="gray">
              Пробег
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium">
              {ad?.mileage} км
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium" color="gray">
              Описание
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium">
              {ad?.description}
            </CustomTyphography>
          </div>
        </div>
      </div>
    </CustomBottomSheet>
  );
};
