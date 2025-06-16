import { IAdvertisement } from "../db/db";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTelegram } from "../shared/hooks/useTelegram";
import { getAds } from "../services/Ads";

export const UsersAdsContext = createContext<{
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
      }}
    >
      {children}
    </UsersAdsContext.Provider>
  );
};
