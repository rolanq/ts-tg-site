import CustomBadge from "@/app/shared/kit/CustomBadge/CustomBadge";
import { IAdvertisement } from "@/app/db/db";
import React from "react";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { useTelegram } from "@/app/shared/hooks/useTelegram";

interface BadgesProps {
  ad: IAdvertisement;
  size?: "small" | "medium";
}

export default function Badges({ ad, size = "medium" }: BadgesProps) {
  const isNew = ad.createdAt
    ? new Date(ad.createdAt) > new Date(Date.now() - 1000 * 60 * 60 * 24)
    : false;
  const isOnHold = "isOnHold" in ad && ad.isOnHold;
  const isSold = !ad.isActive;

  return (
    <CustomFlex direction="row" gap="5px" align="center">
      {isNew && <CustomBadge text="Новое" variant="success" size={size} />}
      {isOnHold && (
        <CustomBadge text="Под задатком" variant="danger" size={size} />
      )}
      {isSold && <CustomBadge text="Продано" variant="info" size={size} />}
    </CustomFlex>
  );
}
