"use client";
import { IAdvertisement } from "@/app/db/db";
import { getAds } from "@/app/services/Ads";
import { useTelegram } from "@/app/shared/hooks/useTelegram";
import { useEffect, useState } from "react";
import AdCard from "../AdCard/AdCard";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import styles from "./UsersAdsList.module.css";
import CustomLoader from "@/app/shared/kit/CustomLoader/CustomLoader";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";

export default function UsersAdsList() {
  const { user } = useTelegram();
  const [ads, setAds] = useState<IAdvertisement[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    setIsLoading(true);
    getAds(user.id).then((ads) => {
      setAds(ads);
      setIsLoading(false);
    });
  }, [user?.id]);

  if (isLoading) {
    return (
      <CustomFlex
        justify="center"
        align="center"
        className={styles.loaderWrapper}
      >
        <CustomLoader size={36} />
      </CustomFlex>
    );
  }

  return (
    <div className={styles.usersAdsList}>
      <CustomTyphography fontSize="20px" fontWeight="bold">
        Ваши объявления
      </CustomTyphography>
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
}
