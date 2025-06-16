import { AllAdsContext } from "@/app/context/AllAdsContext";
import { UsersAdsContext } from "@/app/context/UsersAdsContext";
import { updateAd } from "@/app/services/Ads";
import { CustomBottomSheet } from "@/app/shared/kit/CustomBottomSheet/CustomBottomSheet";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import React, { useContext } from "react";
import styles from "./HideAd.module.css";

interface HideAdProps {
  open: boolean;
  onDismiss: () => void;
  isUsersAds: boolean;
}

export default function HideAd({ open, onDismiss, isUsersAds }: HideAdProps) {
  const { openedAd, setAds, setOpenedAd, setOpenedAdLoading } = useContext(
    isUsersAds ? UsersAdsContext : AllAdsContext
  );
  const { refetch: refetchAds } = useContext(AllAdsContext);
  const { refetch: refetchUsersAds } = useContext(UsersAdsContext);

  const handleHide = () => {
    if (!openedAd?.id) return;
    onDismiss();
    setOpenedAdLoading(true);

    updateAd(openedAd.id, {
      ...openedAd,
      isActive: false,
    }).then((ad) => {
      setAds((prev) =>
        prev.map((prevAd) => (prevAd.id === ad.id ? ad : prevAd))
      );
      setOpenedAd(ad);
      setOpenedAdLoading(false);
      refetchAds();
      refetchUsersAds();
    });
  };

  return (
    <CustomBottomSheet
      open={open}
      onDismiss={onDismiss}
      snap={35}
      closeIcon={false}
      footer={
        <CustomFlex gap="10px">
          <CustomButton
            onClick={onDismiss}
            stretched
            padding="medium"
            variant="secondary"
          >
            Отмена
          </CustomButton>
          <CustomButton onClick={handleHide} stretched padding="medium">
            Да, скрыть
          </CustomButton>
        </CustomFlex>
      }
    >
      <CustomFlex
        justify="center"
        className={styles.hideAdContainer}
        direction="column"
        gap="10px"
      >
        <CustomTyphography fontSize="20px" fontWeight="bold">
          Вы уверены, что хотите скрыть это объявление?
        </CustomTyphography>
        <CustomTyphography fontSize="16px" fontWeight="medium">
          Объявление будет скрыто и недоступно для просмотра в общем списке. Это
          действие нельзя отменить
        </CustomTyphography>
      </CustomFlex>
    </CustomBottomSheet>
  );
}
