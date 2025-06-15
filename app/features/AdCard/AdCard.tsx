"use client";
import { IAdvertisement } from "@/app/db/db";
import { ImageContainer } from "../ImageContainer/ImageContainer";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import styles from "./AdCard.module.css";
import { useEffect, useState } from "react";
import {
  TELEGRAM_API_URL,
  TELEGRAM_FILE_API_URL,
} from "@/app/shared/constants/telegram";
import Badges from "../Badges/Badges";

interface AdCardProps {
  ad: IAdvertisement;
  onClick: () => void;
}

export default function AdCard({ ad, onClick }: AdCardProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  useEffect(() => {
    async function fetchImageUrl() {
      try {
        if (!ad.photos[0]) return;

        const fileInfo = await fetch(
          `${TELEGRAM_API_URL}/getFile?file_id=${ad.photos[0]}`
        );
        const fileData = await fileInfo.json();

        if (!fileData.ok) {
          console.error("Ошибка получения информации о файле:", fileData);
          return;
        }

        const filePath = fileData.result.file_path;
        setImageUrl(`${TELEGRAM_FILE_API_URL}/${filePath}`);
      } catch (error) {
        console.error("Ошибка при загрузке изображения:", error);
      }
    }

    fetchImageUrl();
  }, [ad]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button className={styles.card} onClick={handleClick}>
      <CustomFlex gap="10px">
        <ImageContainer image={imageUrl} />
        <CustomFlex justify="space-between" className={styles.cardBody}>
          <CustomFlex direction="column" justify="space-between">
            <CustomFlex direction="column">
              <CustomFlex direction="column" justify="space-between">
                <CustomTyphography
                  fontWeight="bold"
                  fontSize="18px"
                  className={styles.textAd}
                >
                  {ad.price} ₽
                </CustomTyphography>
                <CustomTyphography fontSize="16px" className={styles.textAd}>
                  {ad.Brand?.name} {ad.CarModel?.name}, {ad.year}
                </CustomTyphography>
              </CustomFlex>
              <CustomTyphography
                color="gray"
                fontSize="14px"
                className={styles.textAd}
              >
                {ad.Region?.name}
              </CustomTyphography>
            </CustomFlex>
            <div className={styles.badgesContainer}>
              <Badges ad={ad} size="small" />
            </div>
          </CustomFlex>
          {ad.updatedAt && (
            <CustomTyphography color="gray" fontSize="14px">
              {new Date(ad.updatedAt).toLocaleDateString()}
            </CustomTyphography>
          )}
        </CustomFlex>
      </CustomFlex>
    </button>
  );
}
