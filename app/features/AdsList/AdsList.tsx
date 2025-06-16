"use client";
import React, { lazy, useContext, useEffect, useState } from "react";
import AdCard from "../AdCard/AdCard";
import styles from "./AdsList.module.css";
import { getAllAds } from "@/app/services/Ads";
import { IAdvertisement, ISavedSearch } from "@/app/db/db";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import CustomLoader from "@/app/shared/kit/CustomLoader/CustomLoader";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import { CustomInput } from "@/app/shared/kit/CustomInput/CustomInput";
import { AllAdsContext } from "@/app/context/AllAdsContext";
import { Ad } from "../Ad/Ad";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { pluralize } from "@/app/shared/utils/clientUtils";
import SettingsIcon from "@/app/shared/Icons/SettingsIcon";
import SavedSearch from "../SavedSearch/SavedSearch";

interface AdsListProps {
  title?: string;
  withSearch?: boolean;
}

export default function AdsList({ title, withSearch = false }: AdsListProps) {
  const {
    ads,
    isLoading,
    setOpenedAd,
    setIsAdOpen,
    setIncludeFilters,
    savedSearch,
  } = useContext(AllAdsContext);
  const [showList, setShowList] = useState(false);
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    if (withSearch) {
      setIncludeFilters(true);
    } else {
      setIncludeFilters(false);
    }
  }, [withSearch]);

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
            <div className={styles.list}>
              <CustomFlex direction="column" justify="center" gap="10px">
                {withSearch && (
                  <CustomFlex direction="column" gap="10px">
                    <CustomTyphography fontSize="18px" fontWeight="bold">
                      {savedSearch?.Region?.name
                        ? `Поиск автомобилей в регионе ${savedSearch?.Region?.name}`
                        : "Поиск автомобилей по всей России"}
                    </CustomTyphography>
                    <CustomButton
                      onClick={() => setOpen(true)}
                      variant="outline"
                      padding="small"
                      stretched
                      beforeIcon={<SettingsIcon />}
                    >
                      Изменить параметры
                    </CustomButton>
                  </CustomFlex>
                )}

                <CustomTyphography
                  fontSize={withSearch ? "18px" : "20px"}
                  fontWeight="bold"
                >
                  {title
                    ? title
                    : `${ads.length} ${pluralize(ads.length, [
                        "Объявление",
                        "Объявления",
                        "Объявлений",
                      ])}`}
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

      <SavedSearch open={open} onDismiss={() => setOpen(false)} />
    </>
  );
}
