"use client";
import { IAdvertisement, ISavedSearch } from "../db/db";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getAllAds } from "../services/Ads";
import { getAdvertismentWhereCondition } from "../shared/utils/utils";
import { useTelegram } from "../shared/hooks/useTelegram";
import { getSavedSearch } from "../services/SavedSearch";

export const AllAdsContext = createContext<{
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
}>({
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
});

export const AllAdsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useTelegram();
  const [ads, setAds] = useState<IAdvertisement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openedAd, setOpenedAd] = useState<IAdvertisement | null>(null);
  const [openedAdLoading, setOpenedAdLoading] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [includeFilters, setIncludeFilters] = useState(false);
  const [savedSearch, setSavedSearch] = useState<Partial<ISavedSearch>>();

  const refetchAds = useCallback(() => {
    setIsLoading(true);

    if (user?.id) {
      getSavedSearch(user?.id).then((savedSearch) => {
        setSavedSearch(savedSearch);
      });
    }

    getAllAds(includeFilters, user?.id).then((ads) => {
      setAds(ads);
      setIsLoading(false);
    });
  }, [user?.id, includeFilters]);

  useEffect(() => {
    refetchAds();
  }, [includeFilters]);

  return (
    <AllAdsContext.Provider
      value={{
        ads,
        setAds,
        isLoading,
        setIsLoading,
        openedAd,
        setOpenedAd,
        openedAdLoading,
        setOpenedAdLoading,
        isAdOpen,
        setIsAdOpen,
        includeFilters,
        setIncludeFilters,
        savedSearch,
        setSavedSearch,

        refetch: refetchAds,
      }}
    >
      {children}
    </AllAdsContext.Provider>
  );
};
