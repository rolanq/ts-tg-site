import { IAdvertisement } from "../db/db";
import { createContext, useCallback, useEffect, useState } from "react";
import { useTelegram } from "../shared/hooks/useTelegram";
import { getAds } from "../services/Ads";
import { defaultContext, IContextAds } from "./defaulContext";

export const UsersAdsContext = createContext<IContextAds>(defaultContext);

export const UsersAdsProvider = ({
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

  useEffect(() => {
    if (!user?.id) return;

    setIsLoading(true);
    getAds(user.id).then((ads) => {
      setAds(ads);
      setIsLoading(false);
    });
  }, [user?.id]);

  const refetchAds = useCallback(() => {
    if (!user?.id) return;
    setIsLoading(true);
    getAds(user.id).then((ads) => {
      setAds(ads);
      setIsLoading(false);
    });
  }, [user?.id]);

  return (
    <UsersAdsContext.Provider
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

        includeFilters: false,
        setIncludeFilters: () => {},
        savedSearch: undefined,
        setSavedSearch: () => {},
      }}
    >
      {children}
    </UsersAdsContext.Provider>
  );
};
