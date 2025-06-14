"use server";

import { AdvertisementDraft, IAdvertisementDraft } from "../db/db";

export const getDraft = async (userId: number) => {
  const draft = await AdvertisementDraft.findOne({
    where: {
      userId: String(userId),
    },
  });
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
