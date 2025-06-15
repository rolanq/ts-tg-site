"use client";
import { IAdvertisement } from "@/app/db/db";
import { getAds } from "@/app/services/Ads";
import { useTelegram } from "@/app/shared/hooks/useTelegram";
import { useContext, useEffect, useState } from "react";
import AdCard from "../AdCard/AdCard";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import styles from "./UsersAdsList.module.css";
import CustomLoader from "@/app/shared/kit/CustomLoader/CustomLoader";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { Ad } from "../Ad/Ad";
import { UsersAdsContext } from "@/app/context/UsersAdsContext";

export default function UsersAdsList() {
  const { ads, isLoading, setOpenedAd } = useContext(UsersAdsContext);

  const handleAdClick = (ad: IAdvertisement) => {
    setOpenedAd(ad);
  };

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
    <>
      <div className={styles.usersAdsList}>
        <CustomTyphography fontSize="20px" fontWeight="bold">
          Ваши объявления
        </CustomTyphography>
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} onClick={() => handleAdClick(ad)} />
        ))}
      </div>

      <Ad isUsersAds />
    </>
  );
}
