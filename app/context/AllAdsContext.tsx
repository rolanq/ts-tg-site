import { IAdvertisement } from "../db/db";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useTelegram } from "../shared/hooks/useTelegram";
import { getAllAds } from "../services/Ads";

export const AllAdsContext = createContext<{
  ads: IAdvertisement[];
  setAds: Dispatch<SetStateAction<IAdvertisement[]>>;
  isLoading: boolean;
  openedAd: IAdvertisement | null;
  setOpenedAd: Dispatch<SetStateAction<IAdvertisement | null>>;
  openedAdLoading: boolean;
  setOpenedAdLoading: Dispatch<SetStateAction<boolean>>;
}>({
  ads: [],
  setAds: () => {},
  isLoading: false,
  openedAd: null,
  setOpenedAd: () => {},
  openedAdLoading: false,
  setOpenedAdLoading: () => {},
});

export const AllAdsProvier = ({ children }: { children: React.ReactNode }) => {
  const [ads, setAds] = useState<IAdvertisement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openedAd, setOpenedAd] = useState<IAdvertisement | null>(null);
  const [openedAdLoading, setOpenedAdLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllAds().then((ads) => {
      setAds(ads);
      setIsLoading(false);
    });
  }, []);

  return (
    <AllAdsContext.Provider
      value={{ ads, setAds, isLoading, openedAd, setOpenedAd, openedAdLoading, setOpenedAdLoading }}
    >
      {children}
    </AllAdsContext.Provider>
  );
};
