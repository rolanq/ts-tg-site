"use client";
import React, { lazy, useContext, useEffect, useState } from "react";
import AdCard from "../AdCard/AdCard";
import styles from "./AdsList.module.css";
import { getAllAds } from "@/app/services/Ads";
import { IAdvertisement } from "@/app/db/db";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import CustomLoader from "@/app/shared/kit/CustomLoader/CustomLoader";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import { CustomInput } from "@/app/shared/kit/CustomInput/CustomInput";
import { AllAdsContext } from "@/app/context/AllAdsContext";
import { Ad } from "../Ad/Ad";

interface AdsListProps {
  title?: string;
  withSearch?: boolean;
}

export default function AdsList({ title, withSearch = false }: AdsListProps) {
  const { ads, isLoading, openedAd, setOpenedAd } = useContext(AllAdsContext);

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
      <div className={styles.list}>
        {withSearch && (
          <CustomInput placeholder="Поиск" value="" onChange={() => {}} />
        )}
        <CustomTyphography fontSize="20px" fontWeight="bold">
          {title}
        </CustomTyphography>
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} onClick={() => handleAdClick(ad)} />
        ))}
      </div>

      <Ad />
    </>
  );
}
