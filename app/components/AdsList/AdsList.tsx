import { Advertisement, Brand, CarModel, Region } from "@/app/db/db";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import AdCard from "../AdCard/AdCard";

export default async function AdsList() {
  const advertisements = await Advertisement.findAll({
    include: [Brand, CarModel, Region],
  });
  const serializedAds = advertisements.map((ad) => {
    const json = ad.toJSON();
    return {
      ...json,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    };
  });
  return (
    <Flex flexDirection="column" gap={3} padding={3}>
      {serializedAds.length === 0 ? (
        <Text>Объявлений пока нет</Text>
      ) : (
        serializedAds.map((ad) => <AdCard key={ad.id} ad={ad} />)
      )}
    </Flex>
  );
}
