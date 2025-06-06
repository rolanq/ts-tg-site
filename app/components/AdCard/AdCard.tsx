"use server";

import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import styles from "./AdCard.module.css";
import { IAdvertisement } from "@/app/db/db";
import { ImageContainer } from "../ImageContainer/ImageContainer";
import { COLORS } from "@/app/constants/colors";

export default async function AdCard({ ad }: { ad: IAdvertisement }) {
  async function fetchImageUrl() {
    try {
      if (!ad.photos[0]) return;

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
    <Card variant="elevated" borderRadius={"12px"}>
      <CardBody display="flex" gap={5} padding={"2.5"}>
        <ImageContainer image={imageUrl} />

        <Flex flexDirection="column">
          <Text fontSize="xl" fontWeight="bold">
            {ad.price} ₽
          </Text>
          <Text fontSize="md" fontWeight="medium">
            {ad.Brand?.name} {ad.CarModel?.name}, {ad.year}
          </Text>
          <Text fontSize="sm" color={COLORS.gray}>
            {ad.Region?.name}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
}
