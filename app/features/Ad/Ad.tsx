"use client";
import { IAdvertisement } from "@/app/db/db";
import { CustomBottomSheet } from "@/app/shared/kit/CustomBottomSheet/CustomBottomSheet";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ImageContainer } from "../ImageContainer/ImageContainer";
import CustomSlider from "@/app/shared/kit/CustomSlider/CustomSlider";
import styles from "./Ad.module.css";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import classNames from "classnames";
import CustomLoader from "@/app/shared/kit/CustomLoader/CustomLoader";
import {
  TELEGRAM_API_URL,
  TELEGRAM_FILE_API_URL,
} from "@/app/shared/constants/telegram";
import Link from "next/link";
import Badges from "../Badges/Badges";
import FooterButtons from "./FooterButtons";
import { UsersAdsContext } from "@/app/context/UsersAdsContext";
import { AllAdsContext } from "@/app/context/AllAdsContext";

interface Image {
  url: string;
  file_id: string;
}

interface Video {
  url: string;
  file_id: string;
}

export const Ad = ({ isUsersAds = false }: { isUsersAds?: boolean }) => {
  const { openedAd, setOpenedAd, openedAdLoading, setOpenedAdLoading } =
    useContext(isUsersAds ? UsersAdsContext : AllAdsContext);
  const [images, setImages] = useState<Image[]>([]);
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    if (!openedAd) return;
    let timeout: NodeJS.Timeout;
    setOpenedAdLoading(true);
    openedAd.photos.forEach((photo) => {
      fetch(`${TELEGRAM_API_URL}/getFile?file_id=${photo}`)
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
              url: `${TELEGRAM_FILE_API_URL}/${filePath}`,
              file_id: photo,
            },
          ]);
        });
    });

    if (openedAd.video) {
      fetch(`${TELEGRAM_API_URL}/getFile?file_id=${openedAd.video}`)
        .then((res) => res.json())
        .then((fileData) => {
          if (!fileData.ok) {
            console.error("Ошибка получения информации о файле:", fileData);
            return;
          }

          const filePath = fileData.result.file_path;
          setVideo({
            url: `${TELEGRAM_FILE_API_URL}/${filePath}`,
            file_id: openedAd.video!,
          });
        });
    }

    timeout = setTimeout(() => {
      setOpenedAdLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [openedAd]);

  const onDismiss = () => {
    setOpenedAd(null);
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

  const renderVideo = useMemo(() => {
    if (!openedAd?.video) return null;

    return (
      <div className={styles.imageContainer}>
        <video src={video?.url} controls className={styles.video} />
      </div>
    );
  }, [openedAd]);

  return (
    <CustomBottomSheet
      open={!!openedAd}
      onDismiss={onDismiss}
      snap={95}
      disableDragClose
      footer={<FooterButtons isUsersAds={isUsersAds} />}
    >
      {openedAd && !openedAdLoading ? (
        <div className={styles.adContainer}>
          <div className={styles.imagesContainer}>
            <CustomSlider items={[renderVideo, ...renderImages]} />
          </div>
          <div className={styles.adInfoContainer}>
            <div className={styles.badgesContainer}>
              <Badges ad={openedAd} />
            </div>
            <CustomFlex direction="column" gap="10px">
              <CustomTyphography fontSize="20px" fontWeight="bold">
                {openedAd?.Brand?.name} {openedAd?.CarModel?.name}
                {openedAd?.year} г.
              </CustomTyphography>
            </CustomFlex>
            <div className={styles.adInfoGrid}>
              <CustomTyphography
                fontSize="16px"
                fontWeight="medium"
                color="gray"
              >
                Регион
              </CustomTyphography>
              <CustomTyphography fontSize="16px" fontWeight="medium">
                {openedAd?.Region?.name}
              </CustomTyphography>

              <CustomTyphography
                fontSize="16px"
                fontWeight="medium"
                color="gray"
              >
                Двигатель
              </CustomTyphography>
              <CustomTyphography fontSize="16px" fontWeight="medium">
                {openedAd?.engineType}, {openedAd?.horsePower} л.с.
              </CustomTyphography>
              <CustomTyphography
                fontSize="16px"
                fontWeight="medium"
                color="gray"
              >
                Привод
              </CustomTyphography>
              <CustomTyphography fontSize="16px" fontWeight="medium">
                {openedAd?.driveType}
              </CustomTyphography>
              <CustomTyphography
                fontSize="16px"
                fontWeight="medium"
                color="gray"
              >
                КПП
              </CustomTyphography>
              <CustomTyphography fontSize="16px" fontWeight="medium">
                {openedAd?.transmission}
              </CustomTyphography>

              <CustomTyphography
                fontSize="16px"
                fontWeight="medium"
                color="gray"
              >
                Пробег
              </CustomTyphography>

              <CustomTyphography fontSize="16px" fontWeight="medium">
                {openedAd?.mileage} км
              </CustomTyphography>

              {openedAd?.autotekaLink && (
                <>
                  <CustomTyphography
                    fontSize="16px"
                    fontWeight="medium"
                    color="gray"
                  >
                    Автотека
                  </CustomTyphography>
                  <CustomTyphography fontSize="16px" fontWeight="medium">
                    <Link href={openedAd?.autotekaLink} target="_blank">
                      Открыть
                    </Link>
                  </CustomTyphography>
                </>
              )}

              <CustomTyphography
                fontSize="16px"
                fontWeight="medium"
                color="gray"
              >
                Описание
              </CustomTyphography>
              <CustomTyphography fontSize="16px" fontWeight="medium">
                {openedAd?.description}
              </CustomTyphography>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.loaderWrapper}>
          <CustomLoader size={36} label="Обновляем информацию" />
        </div>
      )}
    </CustomBottomSheet>
  );
};
