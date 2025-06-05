"use server";

import { Flex, Text } from "@chakra-ui/react";
import { IAdvertisement } from "../db/db";
import Image from "next/image";
import styles from "./AdCard.module.css";

export default async function AdCard({ ad }: { ad: IAdvertisement }) {
  async function fetchImageUrl() {
    try {
      if (!ad.photos[0]) return null;

      const fileInfo = await fetch(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=${ad.photos[0]}`
      );
      const fileData = await fileInfo.json();

      if (!fileData.ok) {
        console.error("Ошибка получения информации о файле:", fileData);
        return;
      }

      const filePath = fileData.result.file_path;
      return `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
    }
  }

  const imageUrl = await fetchImageUrl();

  return (
    <Flex className={styles.card} gap={10}>
      <div className={styles.imageContainer}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Photo"
            width={100}
            height={100}
            unoptimized
          />
        )}
      </div>
      <Flex flexDirection="column">
        <Text>{ad.Brand?.name}</Text>
        <Text>{ad.price}</Text>
        <Text>{ad.description}</Text>
      </Flex>
    </Flex>
  );
}
