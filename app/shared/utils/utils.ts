import { IAdvertisement, ISavedSearch } from "@/app/db/db";
import { Op, WhereOptions } from "sequelize";

export const getAdvertismentWhereCondition = (savedSearch: ISavedSearch) => {
  const whereCondition: WhereOptions<IAdvertisement> = {
    isActive: true,
  };

  if (savedSearch.regionId) {
    whereCondition.regionId = savedSearch.regionId;
  }

  if (savedSearch.brandId) {
    whereCondition.brandId = savedSearch.brandId;
  }

  if (
    savedSearch.priceFrom !== undefined ||
    savedSearch.priceTo !== undefined
  ) {
    const priceConditions = [];

    if (savedSearch.priceFrom !== null) {
      priceConditions.push({ [Op.gte]: Number(savedSearch.priceFrom) });
    }

    if (savedSearch.priceTo !== null) {
      priceConditions.push({ [Op.lte]: Number(savedSearch.priceTo) });
    }

    if (priceConditions.length > 0) {
      whereCondition.price = { [Op.and]: priceConditions };
    }
  }

  return whereCondition;
};
