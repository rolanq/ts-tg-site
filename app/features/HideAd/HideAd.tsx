import { updateAd } from "@/app/services/Ads";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import React from "react";
import styles from "./HideAd.module.css";
import { useAdsContext } from "../../shared/hooks/useAdContext";
import { PureBottomSheet } from "@/app/shared/kit/PureBottomSheet/PureBottomSheet";

interface HideAdProps {
  open: boolean;
  onDismiss: () => void;
}

export default function HideAd({ open, onDismiss }: HideAdProps) {
  const { openedAd, setOpenedAd, setOpenedAdLoading, refetch } =
    useAdsContext();

  const handleHide = () => {
    if (!openedAd?.id) return;
    onDismiss();
    setOpenedAdLoading(true);

    updateAd(openedAd.id, {
      ...openedAd,
      isActive: false,
    }).then((ad) => {
      setOpenedAd(ad);
      setOpenedAdLoading(false);
      refetch();
    });
  };

  return (
    <PureBottomSheet
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
    </PureBottomSheet>
  );
}
