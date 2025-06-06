"use server";

import { Badge, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { IAdvertisement } from "@/app/db/db";
import { ImageContainer } from "../ImageContainer/ImageContainer";
import { COLORS } from "@/app/shared/constants/colors";

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

  const badges = () => {
    if (!ad.createdAt) return null;
    return (
      ad.createdAt > new Date(Date.now() - 1000 * 60 * 60 * 24) && (
        <Flex flexDirection="column" width={"fit-content"}>
          <Badge colorScheme="green" borderRadius={"4px"}>
            Новое
          </Badge>
        </Flex>
      )
    );
  };

  return (
    <Card variant="elevated" borderRadius={"12px"} height={"125px"}>
      <CardBody display="flex" padding={"2.5"} justifyContent="space-between">
        <Flex gap={5}>
          <Flex height={"100%"} alignItems={"center"}>
            <ImageContainer image={imageUrl} />
          </Flex>

          <Flex flexDirection="column" justifyContent={"space-between"}>
            <Flex flexDirection={"column"}>
              <Text fontSize="md" fontWeight="bold">
                {ad.price} ₽
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {ad.Brand?.name} {ad.CarModel?.name}, {ad.year}
              </Text>
              <Text fontSize="xs" color={COLORS.gray}>
                {ad.Region?.name}
              </Text>
            </Flex>
            {badges()}
          </Flex>
        </Flex>
        {ad.updatedAt && (
          <Flex flexDirection="column">
            <Text fontSize="xs" color={COLORS.gray}>
              {new Date(ad.updatedAt).toLocaleDateString()}
            </Text>
          </Flex>
        )}
      </CardBody>
    </Card>
  );
}
