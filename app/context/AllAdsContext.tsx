"use client";
import { IAdvertisement } from "../db/db";
import { createContext, useCallback, useEffect, useState } from "react";
import { getAllAds } from "../services/Ads";
import { IContextAds } from "./defaulContext";
import { defaultContext } from "./defaulContext";

export const AllAdsContext = createContext<IContextAds>(defaultContext);

export const AllAdsProvider = ({ children }: { children: React.ReactNode }) => {
  const [ads, setAds] = useState<IAdvertisement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openedAd, setOpenedAd] = useState<IAdvertisement | null>(null);
  const [openedAdLoading, setOpenedAdLoading] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);

  const refetchAds = useCallback(() => {
    setIsLoading(true);
    getAllAds().then((ads) => {
      setAds(ads);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    refetchAds();
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
