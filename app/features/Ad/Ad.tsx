"use client";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import React, { useEffect, useMemo, useState, useCallback } from "react";
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
import HideAd from "../HideAd/HideAd";
import CustomLoader from "@/app/shared/kit/CustomLoader/CustomLoader";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useAdsContext } from "../../shared/hooks/useAdContext";
import CustomSeparator from "@/app/shared/kit/CustomSeparator/CustomSeparator";
import { PureBottomSheet } from "@/app/shared/kit/PureBottomSheet/PureBottomSheet";

interface Image {
  url: string;
  file_id: string;
}

interface Video {
  url: string;
  file_id: string;
}

const getFileUrl = async (fileId: string): Promise<string> => {
  try {
    const response = await fetch(
      `${TELEGRAM_API_URL}/getFile?file_id=${fileId}`
    );
    const fileData = await response.json();

    if (!fileData.ok) {
      console.error("Ошибка получения информации о файле:", fileData);
      return "";
    }

    return `${TELEGRAM_FILE_API_URL}/${fileData.result.file_path}`;
  } catch (error) {
    console.error("Ошибка при получении URL файла:", error);
    return "";
  }
};

const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.src = url;
  });
};

export const Ad = () => {
  const {
    openedAd,
    setOpenedAd,
    openedAdLoading,
    setOpenedAdLoading,
    setIsAdOpen,
    isAdOpen,
  } = useAdsContext();

  const [images, setImages] = useState<Image[]>([]);
  const [video, setVideo] = useState<Video | null>(null);
  const [hideAdOpen, setHideAdOpen] = useState(false);

  useEffect(() => {
    if (!openedAd) return;

    const loadMedia = async () => {
      setOpenedAdLoading(true);
      try {
        const photoUrls = await Promise.all(openedAd.photos.map(getFileUrl));

        const newImages = openedAd.photos
          .map((photo, index) => ({
            url: photoUrls[index],
            file_id: photo,
          }))
          .filter((img) => img.url);

        await Promise.all(newImages.map((img) => preloadImage(img.url)));

        setImages(newImages);

        if (openedAd.video) {
          const videoUrl = await getFileUrl(openedAd.video);
          if (videoUrl) {
            setVideo({
              url: videoUrl,
              file_id: openedAd.video,
            });
          }
        }
      } catch (error) {
        console.error("Ошибка при загрузке медиа:", error);
      } finally {
        setTimeout(() => {
          setOpenedAdLoading(false);
        }, 700);
      }
    };

    loadMedia();
  }, [openedAd]);

  const onDismiss = useCallback(() => {
    setIsAdOpen(false);
    setImages([]);
    setVideo(null);
    setOpenedAd(null);
  }, [setIsAdOpen]);

  const renderImages = useMemo(() => {
    return images.map((image) => (
      <div key={image.file_id} className={styles.imageContainer}>
        <ImageContainer
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
      <div key={video.file_id} className={styles.imageContainer}>
        <video
          src={video.url}
          controls
          className={styles.video}
          rel="preload"
          preload="auto"
          autoPlay={false}
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
      <PureBottomSheet
        open={isAdOpen}
        onDismiss={onDismiss}
        snap={90}
        disableDragClose
        footerWithoutBoxShadow
        footer={<FooterButtons setHideAdOpen={setHideAdOpen} />}
      >
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={openedAd && !openedAdLoading ? "openedAd" : "openedAdLoading"}
            timeout={300}
            classNames={{
              enter: styles.fadeEnter,
              enterActive: styles.fadeEnterActive,
              exit: styles.fadeExit,
              exitActive: styles.fadeExitActive,
            }}
          >
            {openedAd && !openedAdLoading ? (
              <div className={styles.adContainer}>
                <div className={styles.imagesContainer}>
                  <CustomSlider items={renderItems} />
                </div>
                {renderItems.length > 1 && <CustomSeparator />}
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
            ) : (
              <div className={styles.loaderWrapper}>
                <CustomLoader
                  size={36}
                  label="Обновляем информацию"
                  loading={openedAdLoading}
                  successLabel="Информация обновлена"
                />
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </PureBottomSheet>
      <HideAd open={hideAdOpen} onDismiss={() => setHideAdOpen(false)} />
    </>
  );
};
