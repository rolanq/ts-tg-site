"use client";
import React, { useContext, useEffect, useState } from "react";
import AdCard from "../AdCard/AdCard";
import styles from "./AdsList.module.css";
import { IAdvertisement } from "@/app/db/db";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import CustomLoader from "@/app/shared/kit/CustomLoader/CustomLoader";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import { AllAdsContext } from "@/app/context/AllAdsContext";
import { Ad } from "../Ad/Ad";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useSearchParams } from "next/navigation";

export default function AdsList() {
  const searchParams = useSearchParams();
  const adId = searchParams.get("ad");
  const { ads, isLoading, setOpenedAd, setIsAdOpen } =
    useContext(AllAdsContext);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowList(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setShowList(false);
    }
  }, [isLoading]);

  const handleAdClick = (ad: IAdvertisement) => {
    setOpenedAd(ad);
    setIsAdOpen(true);
  };

  useEffect(() => {
    if (adId) {
      const ad = ads.find((ad) => ad.id === Number(adId));
      if (ad) {
        setOpenedAd(ad);
        setIsAdOpen(true);
      }
    }
  }, [adId, ads, setOpenedAd, setIsAdOpen]);

  return (
    <>
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
              <CustomFlex direction="column" justify="center" gap="10px">
                <CustomTyphography fontSize="20px" fontWeight="bold">
                  Все объявления
                </CustomTyphography>
              </CustomFlex>
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
    </>
  );
}
