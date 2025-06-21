"use server";
import {
  Advertisement,
  AdvertisementDraft,
  Brand,
  CarModel,
  IAdvertisement,
  ISavedSearch,
  Region,
} from "@/app/db/db";
import { getAdvertismentWhereCondition } from "../shared/utils/utils";

export const getAds = async (userId: number) => {
  const ads = await Advertisement.findAll({
    where: {
      userId: String(userId),
    },
    include: [Brand, CarModel, Region],
  });
  return ads.map((ad) => ad.toJSON());
};

export const getAllAds = async () => {
  const advertisements = await Advertisement.findAll({
    include: [Brand, CarModel, Region],
    where: {
      isActive: true,
    },
  });
  return advertisements.map((ad) => ad.toJSON());
};

export const getAdsBySavedSearch = async (search: ISavedSearch) => {
  const where = getAdvertismentWhereCondition(search);
  const advertisements = await Advertisement.findAll({
    where: {
      ...where,
      isActive: true,
    },
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
  const newAdId = await generateRandomIdForAdvertisement();
  const draft = await AdvertisementDraft.findOne({
    where: {
      userId: String(userId),
    },
  });

  if (!draft) {
    throw new Error("Draft not found");
  }

  await Advertisement.create({
    ...draft.toJSON(),
    id: newAdId,
    userId: String(userId),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const newAd = await Advertisement.findByPk(newAdId, {
    include: [Brand, CarModel, Region],
  });

  if (!newAd) {
    throw new Error("New ad not found");
  }

  await draft.destroy();

  return newAd.toJSON() as IAdvertisement;
};

export const updateAd = async (adId: number, data: IAdvertisement) => {
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
