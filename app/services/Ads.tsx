"use server";
import {
  Advertisement,
  Brand,
  CarModel,
  initDatabase,
  Region,
} from "@/app/db/db";

export const getAds = async (userId: number) => {
  await initDatabase();
  const ads = await Advertisement.findAll({
    where: {
      userId: String(userId),
    },
    include: [Brand, CarModel, Region],
  });
  return ads.map((ad) => ad.toJSON());
};

export const getAllAds = async () => {
  await initDatabase();
  const advertisements = await Advertisement.findAll({
    include: [Brand, CarModel, Region],
  });
  return advertisements.map((ad) => ad.toJSON());
};
