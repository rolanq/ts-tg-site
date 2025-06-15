"use server";
import {
  Advertisement,
  AdvertisementDraft,
  Brand,
  CarModel,
  IAdvertisement,
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

export const generateRandomIdForAdvertisement = async (): Promise<number> => {
  const generateRandomId = () => {
    return Math.floor(Math.random() * (2147483640 - 10000000 + 1) + 10000000);
  };

  const id = generateRandomId();

  const advertisement = await Advertisement.findByPk(id);

  if (advertisement) {
    return generateRandomIdForAdvertisement();
  }

  return id;
};

export const publishAd = async (userId: number) => {
  await initDatabase();

  const newAdId = await generateRandomIdForAdvertisement();
  const draft = await AdvertisementDraft.findOne({
    where: {
      userId: String(userId),
    },
  });

  if (!draft) {
    throw new Error("Draft not found");
  }

  const newAd = await Advertisement.create({
    ...draft.toJSON(),
    id: newAdId,
    userId: String(userId),
  });

  await draft.destroy();

  return newAd.toJSON() as IAdvertisement;
};

export const updateAd = async (adId: number, data: IAdvertisement) => {
  await initDatabase();
  const ad = await Advertisement.findByPk(adId);
  if (!ad) {
    throw new Error("Ad not found");
  }
  await ad.update(data);

  const updatedAd = await Advertisement.findByPk(adId, {
    include: [Brand, CarModel, Region],
  });
  return updatedAd?.toJSON() as IAdvertisement;
};