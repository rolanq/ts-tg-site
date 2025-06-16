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
import { IContextAds } from "./defaulContext";
import { defaultContext } from "./defaulContext";

export const AllAdsContext = createContext<IContextAds>(defaultContext);

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
