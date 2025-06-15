"use server";

import { AdvertisementDraft, IAdvertisementDraft } from "../db/db";
import { DEFAULT_AD_DRAFT } from "../shared/constants/telegram";

export const getDraft = async (userId: number) => {
  const draft = await AdvertisementDraft.findOne({
    where: {
      userId: String(userId),
    },
  });

  if (!draft) {
    const newDraft = await AdvertisementDraft.create({
      ...DEFAULT_AD_DRAFT,
      userId: String(userId),
    });

    return newDraft.toJSON() as IAdvertisementDraft;
  }

  return draft?.toJSON() as IAdvertisementDraft;
};

export const updateDraft = async (
  userId: number,
  draft: IAdvertisementDraft
) => {
  await AdvertisementDraft.update(draft, {
    where: {
      userId: String(userId),
    },
  });
  const updatedDraft = await AdvertisementDraft.findOne({
    where: {
      userId: String(userId),
    },
  });
  return updatedDraft?.toJSON() as IAdvertisementDraft;
};
