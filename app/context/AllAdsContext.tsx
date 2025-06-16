"use client";
import { IAdvertisement } from "../db/db";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getAllAds } from "../services/Ads";

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
  refetch: () => {},
});

export const AllAdsProvider = ({ children }: { children: React.ReactNode }) => {
  const [ads, setAds] = useState<IAdvertisement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openedAd, setOpenedAd] = useState<IAdvertisement | null>(null);
  const [openedAdLoading, setOpenedAdLoading] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllAds().then((ads) => {
      setAds(ads);
      setIsLoading(false);
    });
  }, []);

  const refetchAds = useCallback(() => {
    setIsLoading(true);
    getAllAds().then((ads) => {
      setAds(ads);
      setIsLoading(false);
    });
  }, []);

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
        refetch: refetchAds,
      }}
    >
      {children}
    </AllAdsContext.Provider>
  );
};
