import { IAdvertisement } from "../db/db";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useTelegram } from "../shared/hooks/useTelegram";
import { getAds } from "../services/Ads";

export const UsersAdsContext = createContext<{
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

export const UsersAdsProvier = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useTelegram();
  const [ads, setAds] = useState<IAdvertisement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openedAd, setOpenedAd] = useState<IAdvertisement | null>(null);
  const [openedAdLoading, setOpenedAdLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    setIsLoading(true);
    getAds(user.id).then((ads) => {
      setAds(ads);
      setIsLoading(false);
    });
  }, [user?.id]);

  return (
    <UsersAdsContext.Provider
      value={{ ads, setAds, isLoading, openedAd, setOpenedAd, openedAdLoading, setOpenedAdLoading }}
    >
      {children}
    </UsersAdsContext.Provider>
  );
};
