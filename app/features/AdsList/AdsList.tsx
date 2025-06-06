import { Advertisement, Brand, CarModel, Region } from "@/app/db/db";
import { List, ListItem } from "@chakra-ui/react";
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
    <List spacing={3} padding={3}>
      {serializedAds.map((ad) => (
        <ListItem key={ad.id}>
          <AdCard ad={ad} />
        </ListItem>
      ))}
    </List>
  );
}
