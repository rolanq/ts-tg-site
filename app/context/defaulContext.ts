import { Dispatch, SetStateAction } from "react";
import { IAdvertisement, ISavedSearch } from "../db/db";

export interface IContextAds {
  ads: IAdvertisement[];
  setAds: Dispatch<SetStateAction<IAdvertisement[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  openedAd: IAdvertisement | null;
  setOpenedAd: Dispatch<SetStateAction<IAdvertisement | null>>;
  openedAdLoading: boolean;
  setOpenedAdLoading: Dispatch<SetStateAction<boolean>>;
  isAdOpen: boolean;
  setIsAdOpen: Dispatch<SetStateAction<boolean>>;
  includeFilters: boolean;
  setIncludeFilters: Dispatch<SetStateAction<boolean>>;
  savedSearch: Partial<ISavedSearch> | undefined;
  setSavedSearch: Dispatch<SetStateAction<Partial<ISavedSearch> | undefined>>;

  refetch: () => void;
}

export const defaultContext: IContextAds = {
  ads: [],
  setAds: () => {},
  isLoading: false,
  setIsLoading: () => {},
  openedAd: null,
  setOpenedAd: () => {},
  openedAdLoading: false,
  setOpenedAdLoading: () => {},
  isAdOpen: false,
  setIsAdOpen: () => {},
  includeFilters: false,
  setIncludeFilters: () => {},
  savedSearch: undefined,
  setSavedSearch: () => {},

  refetch: () => {},
};
