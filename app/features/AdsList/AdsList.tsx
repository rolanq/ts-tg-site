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
import { CSSTransition, SwitchTransition } from "react-transition-group";

interface AdsListProps {
  title?: string;
  withSearch?: boolean;
}

export default function AdsList({ title, withSearch = false }: AdsListProps) {
  const { ads, isLoading, setOpenedAd, setIsAdOpen } = useContext(AllAdsContext);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowList(true);
      }, 600);

      return () => clearTimeout(timer);
    } else {
      setShowList(false);
    }
  }, [isLoading]);

  const handleAdClick = (ad: IAdvertisement) => {
    setOpenedAd(ad);
    setIsAdOpen(true);
  };

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={showList ? "list" : "loader"}
        timeout={300}
        classNames={{
          enter: styles.fadeEnter,
          enterActive: styles.fadeEnterActive,
          exit: styles.fadeExit,
          exitActive: styles.fadeExitActive,
        }}
        unmountOnExit
      >
        {showList ? (
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
            <Ad />
          </div>
        ) : (
          <div className={styles.loaderWrapper}>
            <CustomLoader
              size={36}
              label="Загружаем объявления"
              loading={isLoading}
              successLabel="Объявления загружены"
            />
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  );
}
