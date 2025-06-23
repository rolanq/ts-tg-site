import { getStatisticsByUserId } from "@/app/services/Users";
import { useTelegram } from "@/app/shared/hooks/useTelegram";
import DefaultUser from "@/app/shared/Icons/DefaultUser";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { PureBottomSheet } from "@/app/shared/kit/PureBottomSheet/PureBottomSheet";
import { IStatistics } from "@/app/shared/types/config";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./UserStats.module.css";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { updateSavedSearch } from "@/app/services/SavedSearch";

interface IProps {
  open: boolean;
  onDismiss: () => void;
}

export default function UserStats({ open, onDismiss }: IProps) {
  const { user } = useTelegram();
  const [statistics, setStatistics] = useState<IStatistics | null>(null);

  useEffect(() => {
    if (user) {
      getStatisticsByUserId(user.id.toString()).then(setStatistics);
    }
  }, [user]);

  const handleDisableNotifications = useCallback(() => {
    if (user?.id) {
      updateSavedSearch(user.id, {
        regionId: null,
        brandId: null,
        priceFrom: null,
        priceTo: null,
      });
    }
  }, [user]);

  return (
    <PureBottomSheet
      open={open}
      onDismiss={onDismiss}
      snap={90}
      footer={
        <CustomFlex direction="column" gap="10px">
          <CustomButton
            onClick={handleDisableNotifications}
            stretched
            variant="outline"
          >
            Выключить уведомления
          </CustomButton>
          <CustomButton onClick={onDismiss} stretched>
            Закрыть
          </CustomButton>
        </CustomFlex>
      }
    >
      <CustomFlex
        direction="column"
        align="center"
        gap="10px"
        className={styles.content}
      >
        {user?.photo_url ? (
          <Image
            src={user?.photo_url || ""}
            alt="user"
            width={100}
            height={100}
            unoptimized
            className={styles.userImage}
          />
        ) : (
          <DefaultUser className={styles.defaultUser} />
        )}
        <CustomFlex direction="column" gap="30px" align="center">
          <CustomFlex direction="column" gap="0px" align="center">
            <CustomTyphography fontSize="16px" fontWeight="bold">
              {user?.first_name} {user?.last_name}
            </CustomTyphography>
            <CustomTyphography fontSize="14px" fontWeight="medium">
              @{user?.username}, ID: {user?.id}
            </CustomTyphography>
          </CustomFlex>
          <div className={styles.userInfoGrid}>
            <CustomTyphography fontSize="16px" fontWeight="medium" color="gray">
              Объявлений всего:
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium">
              {statistics?.adCount}
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium" color="gray">
              Активных объявлений:
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium">
              {statistics?.activeAdsCount}
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium" color="gray">
              Объявлений под задатком:
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium">
              {statistics?.adsOnHold}
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium" color="gray">
              Проданных машин:
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium">
              {statistics?.soldCount}
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium" color="gray">
              Всего заработано:
            </CustomTyphography>
            <CustomTyphography fontSize="16px" fontWeight="medium">
              {statistics?.totalEarnings} ₽
            </CustomTyphography>
          </div>
        </CustomFlex>
      </CustomFlex>
    </PureBottomSheet>
  );
}
