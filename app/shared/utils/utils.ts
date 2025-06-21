import { IAdvertisement, IAdvertisementDraft, ISavedSearch } from "@/app/db/db";
import { Op, WhereOptions } from "sequelize";

export const getAdvertismentWhereCondition = (savedSearch: ISavedSearch) => {
  const whereCondition: WhereOptions<IAdvertisement> = {};

  if (savedSearch.regionId) {
    whereCondition.regionId = savedSearch.regionId;
  }

  if (savedSearch.brandId) {
    whereCondition.brandId = savedSearch.brandId;
  }

  const priceFrom = Number(savedSearch.priceFrom);
  const priceTo = Number(savedSearch.priceTo);

  if (!!priceFrom || !!priceTo) {
    const priceConditions = [];

    if (priceFrom) {
      priceConditions.push({ [Op.gte]: priceFrom });
    }

    if (priceTo) {
      priceConditions.push({ [Op.lte]: priceTo });
    }

    if (priceConditions.length > 0) {
      whereCondition.price = { [Op.and]: priceConditions };
    }
  }

  return whereCondition;
};

export const convertDraftToAd = (
  id: number,
  draft: IAdvertisementDraft,
  userId: string
) => {
  return {
    ...draft,
    id,
    userId,
    isActive: true,
    isOnHold: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    hideReason: null,
    channelMessageId: null,
  } as IAdvertisement;
};

export const clearNull = (obj: any) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== undefined && !value
    )
  );
};
