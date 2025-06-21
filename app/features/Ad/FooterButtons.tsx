"use client";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import classNames from "classnames";
import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./Ad.module.css";
import { useTelegram } from "@/app/shared/hooks/useTelegram";
import { updateAd } from "@/app/services/Ads";
import { AllAdsContext } from "@/app/context/AllAdsContext";
import { UsersAdsContext } from "@/app/context/UsersAdsContext";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { editAdInChannel } from "@/app/services/ClientTelegram";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";

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
  const { refetch: refetchAds } = useContext(AllAdsContext);
  const { refetch: refetchUsersAds } = useContext(UsersAdsContext);
  const [isShowButtons, setIsShowButtons] = useState(false);

  const isOwner = openedAd?.userId === String(user?.id);

  const handleOnHold = () => {
    if (!openedAd || !openedAd.id) return;

    setOpenedAdLoading(true);
    updateAd(openedAd.id, {
      ...openedAd,
      isOnHold: !openedAd.isOnHold,
    }).then((ad) => {
      if (ad.channelMessageId) {
        editAdInChannel(ad);
      }
      setAds((prev) =>
        prev.map((prevAd) => (prevAd.id === ad.id ? ad : prevAd))
      );
      setOpenedAd(ad);
      setOpenedAdLoading(false);
      refetchAds();
      refetchUsersAds();
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

  useEffect(() => {
    if (!openedAdLoading) {
      setIsShowButtons(true);
    } else {
      setIsShowButtons(false);
    }
  }, [openedAdLoading]);

  const content = useMemo(() => {
    if (!openedAd?.isActive) {
      return (
        <CustomButton stretched padding="medium" disabled>
          Объявление снято с продажи
        </CustomButton>
      );
    }

    if (isOwner && !isUsersAds) {
      return (
        <CustomTyphography
          fontSize="16px"
          fontWeight="light"
          color="gray"
          textAlign="center"
        >
          Это ваше объявление, управлять им можно через ваш профиль
        </CustomTyphography>
      );
    }

    if (isOwner && isUsersAds) {
      return (
        <CustomFlex gap="10px">
          <CustomButton onClick={handleOnHold} stretched padding="small">
            {openedAd.isOnHold ? "Убрать задаток" : "Под задатком"}
          </CustomButton>
          <CustomButton onClick={handleHide} stretched padding="small">
            Скрыть
          </CustomButton>
        </CustomFlex>
      );
    }

    return (
      <CustomFlex direction="column" gap="10px">
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
      </CustomFlex>
    );
  }, [isOwner, openedAd]);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={isShowButtons ? "content" : "loader"}
        timeout={300}
        classNames={{
          enter: styles.footerFadeEnter,
          enterActive: styles.footerFadeEnterActive,
          exit: styles.footerFadeExit,
          exitActive: styles.footerFadeExitActive,
        }}
      >
        {isShowButtons ? content : <div></div>}
      </CSSTransition>
    </SwitchTransition>
  );
}
