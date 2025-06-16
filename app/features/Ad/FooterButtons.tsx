"use client";

import { IAdvertisement } from "@/app/db/db";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import classNames from "classnames";
import React, { useContext, useState } from "react";
import styles from "./Ad.module.css";
import { useTelegram } from "@/app/shared/hooks/useTelegram";
import { updateAd } from "@/app/services/Ads";
import { AllAdsContext } from "@/app/context/AllAdsContext";
import { UsersAdsContext } from "@/app/context/UsersAdsContext";

export default function FooterButtons({
  isUsersAds,
  setHideAdOpen,
}: {
  isUsersAds: boolean;
  setHideAdOpen: (open: boolean) => void;
}) {
  const { user } = useTelegram();
  const { openedAd, setAds, setOpenedAd, openedAdLoading, setOpenedAdLoading } =
    useContext(isUsersAds ? UsersAdsContext : AllAdsContext);

  const isOwner = openedAd?.userId === String(user?.id);

  const handleOnHold = () => {
    if (!openedAd || !openedAd.id) return;

    setOpenedAdLoading(true);
    updateAd(openedAd.id, {
      ...openedAd,
      isOnHold: !openedAd.isOnHold,
    }).then((ad) => {
      setAds((prev) =>
        prev.map((prevAd) => (prevAd.id === ad.id ? ad : prevAd))
      );
      setOpenedAd(ad);
      setOpenedAdLoading(false);
    });
  };

  const handleHide = () => {
    setHideAdOpen(true);
  };

  const handleCall = () => {
    window.open(`tel:${openedAd?.phoneNumber}`, "_blank");
  };

  const handleMessage = () => {
    window.open(`https://t.me/${openedAd?.telegramUsername}`, "_blank");
  };

  if (isOwner) {
    return (
      <>
        <CustomFlex gap="10px">
          <CustomButton onClick={handleOnHold} stretched padding="medium">
            {openedAd.isOnHold ? "Убрать задаток" : "Под задатком"}
          </CustomButton>
          <CustomButton onClick={handleHide} stretched padding="medium">
            Скрыть
          </CustomButton>
        </CustomFlex>
      </>
    );
  }

  return openedAd ? (
    <>
      <CustomFlex direction="row" gap="10px">
        <CustomButton
          onClick={handleMessage}
          className={classNames(styles.footerButtons, styles.messageButton)}
          stretched
          padding="medium"
        >
          Написать
        </CustomButton>
        {openedAd?.phoneNumber && (
          <CustomButton
            onClick={handleCall}
            className={classNames(styles.footerButtons, styles.callButton)}
            stretched
            padding="medium"
          >
            Позвонить
          </CustomButton>
        )}
      </CustomFlex>
    </>
  ) : undefined;
}
