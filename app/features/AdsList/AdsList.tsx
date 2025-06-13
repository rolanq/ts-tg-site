import { Advertisement, Brand, CarModel, Region } from "@/app/db/db";
import React from "react";
import AdCard from "../AdCard/AdCard";
import styles from "./AdsList.module.css";

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
    <div className={styles.list}>
      {serializedAds.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
}
