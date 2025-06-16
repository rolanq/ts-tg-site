"use client";
import { CustomBottomSheet } from "@/app/shared/kit/CustomBottomSheet/CustomBottomSheet";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ImageContainer } from "../ImageContainer/ImageContainer";
import CustomSlider from "@/app/shared/kit/CustomSlider/CustomSlider";
import styles from "./Ad.module.css";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import {
  TELEGRAM_API_URL,
  TELEGRAM_FILE_API_URL,
} from "@/app/shared/constants/telegram";
import Link from "next/link";
import Badges from "../Badges/Badges";
import FooterButtons from "./FooterButtons";
import { UsersAdsContext } from "@/app/context/UsersAdsContext";
import { AllAdsContext } from "@/app/context/AllAdsContext";
import { useTelegram } from "@/app/shared/hooks/useTelegram";
import HideAd from "../HideAd/HideAd";

interface Image {
  url: string;
  file_id: string;
}

interface Video {
  url: string;
  file_id: string;
}

export const Ad = ({ isUsersAds = false }: { isUsersAds?: boolean }) => {
  const { user } = useTelegram();
  const { openedAd, setOpenedAd, setOpenedAdLoading } = useContext(
    isUsersAds ? UsersAdsContext : AllAdsContext
  );
  const [images, setImages] = useState<Image[]>([]);
  const [video, setVideo] = useState<Video | null>(null);
  const [hideAdOpen, setHideAdOpen] = useState(false);

  const isOwner = openedAd?.userId === String(user?.id);

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
    if (!video) return null;

    return (
      <div className={styles.imageContainer}>
        <video
          src={video?.url}
          controls
          className={styles.video}
          rel="preload"
          preload="auto"
        />
      </div>
    );
  }, [video]);

  const renderItems = useMemo(() => {
    if (renderVideo) {
      return [renderVideo, ...renderImages];
    }
    return renderImages;
  }, [renderImages, renderVideo]);

  return (
    <>
      <CustomBottomSheet
        open={!!openedAd}
        onDismiss={onDismiss}
        snap={95}
        disableDragClose
        footer={
          openedAd?.isActive ? (
            <FooterButtons
              isUsersAds={isUsersAds}
              setHideAdOpen={setHideAdOpen}
            />
          ) : undefined
        }
      >
        {openedAd && (
          <div className={styles.adContainer}>
            <div className={styles.imagesContainer}>
              <CustomSlider items={renderItems} />
            </div>
            <div className={styles.adInfoContainer}>
              <div className={styles.badgesContainer}>
                <Badges ad={openedAd} />
              </div>
              <CustomFlex direction="row" justify="space-between">
                <CustomTyphography
                  fontSize="20px"
                  fontWeight="bold"
                  className={styles.mainContent}
                >
                  {openedAd?.Brand?.name} {openedAd?.CarModel?.name},&nbsp;
                  {openedAd?.year} г.
                </CustomTyphography>
                <CustomFlex
                  direction="column"
                  align="end"
                  className={styles.info}
                >
                  {openedAd?.createdAt && (
                    <CustomTyphography
                      fontSize="16px"
                      fontWeight="medium"
                      color="gray"
                    >
                      {new Date(openedAd?.createdAt).toLocaleDateString()}
                    </CustomTyphography>
                  )}
                  <CustomTyphography
                    fontSize="16px"
                    fontWeight="medium"
                    color="gray"
                  >
                    ID {openedAd?.id}
                  </CustomTyphography>
                </CustomFlex>
              </CustomFlex>
              <div className={styles.adInfoGrid}>
                <CustomTyphography
                  fontSize="16px"
                  fontWeight="medium"
                  color="gray"
                >
                  Цена
                </CustomTyphography>
                <CustomTyphography fontSize="16px" fontWeight="medium">
                  {openedAd?.price} ₽
                </CustomTyphography>
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
        )}
      </CustomBottomSheet>
      <HideAd
        open={hideAdOpen}
        onDismiss={() => setHideAdOpen(false)}
        isUsersAds={isUsersAds}
      />
    </>
  );
};
