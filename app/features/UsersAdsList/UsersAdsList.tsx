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
import { CSSTransition, SwitchTransition } from "react-transition-group";

export default function UsersAdsList() {
  const { ads, isLoading, setOpenedAd, setIsAdOpen } =
    useContext(UsersAdsContext);
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
            <>
              <div className={styles.usersAdsList}>
                <CustomTyphography fontSize="20px" fontWeight="bold">
                  Ваши объявления
                </CustomTyphography>
                {ads.map((ad) => (
                  <AdCard
                    key={ad.id}
                    ad={ad}
                    onClick={() => handleAdClick(ad)}
                  />
                ))}
              </div>

              <Ad />
            </>
          ) : (
            <div className={styles.loaderWrapper}>
              <CustomLoader
                size={36}
                label="Смотрим объявления"
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
