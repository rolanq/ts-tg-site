"use server";

import {
  Brand,
  IBrand,
  initDatabase,
  IRegion,
  ISavedSearch,
  Region,
  SavedSearch,
} from "@/app/db/db";

export const getSavedSearch = async (userId: number) => {
  await initDatabase();
  const savedSearch = await SavedSearch.findOne({
    where: {
      userId: String(userId),
    },
  });

  let savedSearchData = savedSearch?.toJSON() as ISavedSearch;

  if (savedSearchData.brandId) {
    const brand = await Brand.findByPk(savedSearchData.brandId);
    savedSearchData.Brand = brand?.toJSON() as IBrand;
  }
  if (savedSearchData.regionId) {
    const region = await Region.findByPk(savedSearchData.regionId);
    savedSearchData.Region = region?.toJSON() as IRegion;
  }

  return savedSearchData;
};

export const updateSavedSearch = async (
  userId: number,
  savedSearch: Partial<ISavedSearch>
) => {
  await initDatabase();
  const savedSearchToUpdate = await SavedSearch.findOne({
    where: {
      userId: String(userId),
    },
  });
  if (!savedSearchToUpdate) {
    await SavedSearch.create({
      userId: String(userId),
      ...savedSearch,
    });

    return getSavedSearch(userId);
  }

  await SavedSearch.update(savedSearch, {
    where: {
      userId: String(userId),
    },
  });

  const updatedSavedSearch = await getSavedSearch(userId);
  return updatedSavedSearch;
};
