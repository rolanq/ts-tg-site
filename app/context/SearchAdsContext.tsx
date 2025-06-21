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
import { getAdsBySavedSearch, getAllAds } from "../services/Ads";
import { useTelegram } from "../shared/hooks/useTelegram";
import { getSavedSearch } from "../services/SavedSearch";
import { IContextAds } from "./defaulContext";
import { defaultContext } from "./defaulContext";

type SearchAdsContextType = IContextAds & {
  savedSearch: Partial<ISavedSearch> | undefined;
  setSavedSearch: Dispatch<SetStateAction<Partial<ISavedSearch> | undefined>>;
};

const initialContext: SearchAdsContextType = {
  ...defaultContext,
  savedSearch: {},
  setSavedSearch: () => {},
};

export const SearchAdsContext =
  createContext<SearchAdsContextType>(initialContext);

export const SearchAdsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useTelegram();
  const [ads, setAds] = useState<IAdvertisement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openedAd, setOpenedAd] = useState<IAdvertisement | null>(null);
  const [openedAdLoading, setOpenedAdLoading] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [savedSearch, setSavedSearch] = useState<Partial<ISavedSearch>>();

  const refetchAds = useCallback(() => {
    setIsLoading(true);

    if (user?.id) {
      getSavedSearch(user?.id).then((savedSearch) => {
        setSavedSearch(savedSearch);
        getAdsBySavedSearch(savedSearch).then((ads) => {
          setAds(ads);
          setIsLoading(false);
        });
      });
    } else {
      getAllAds().then((ads) => {
        setAds(ads);
        setIsLoading(false);
      });
    }
  }, [user?.id]);

  useEffect(() => {
    refetchAds();
  }, []);

  return (
    <SearchAdsContext.Provider
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
        savedSearch,
        setSavedSearch,

        refetch: refetchAds,
      }}
    >
      {children}
    </SearchAdsContext.Provider>
  );
};
