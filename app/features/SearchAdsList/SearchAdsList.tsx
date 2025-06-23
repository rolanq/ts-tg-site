"use client";
import React, { useContext, useEffect, useState } from "react";
import AdCard from "../AdCard/AdCard";
import styles from "./SearchAdsList.module.css";
import { IAdvertisement } from "@/app/db/db";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import CustomLoader from "@/app/shared/kit/CustomLoader/CustomLoader";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import { Ad } from "../Ad/Ad";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { pluralize } from "@/app/shared/utils/clientUtils";
import SettingsIcon from "@/app/shared/Icons/SettingsIcon";
import SavedSearch from "../SavedSearch/SavedSearch";
import { SearchAdsContext } from "@/app/context/SearchAdsContext";

export default function SearchAdsList() {
  const { ads, isLoading, setOpenedAd, setIsAdOpen, savedSearch } =
    useContext(SearchAdsContext);
  const [open, setOpen] = useState(false);

  const handleAdClick = (ad: IAdvertisement) => {
    setOpenedAd(ad);
    setIsAdOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <CustomLoader
            size={36}
            label="Загружаем объявления"
            loading={isLoading}
            successLabel="Объявления загружены"
          />
        </div>
      ) : (
        <div className={styles.list}>
          <CustomFlex direction="column" justify="center" gap="10px">
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

            <CustomTyphography fontSize="18px" fontWeight="bold">
              {`${ads.length} ${pluralize(ads.length, [
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
          <SavedSearch open={open} onDismiss={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
