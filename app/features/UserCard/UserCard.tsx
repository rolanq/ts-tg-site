"use client";
import { useTelegram } from "@/app/shared/hooks/useTelegram";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import React, { useEffect, useState } from "react";
import styles from "./UserCard.module.css";
import Image from "next/image";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import DefaultUser from "@/app/shared/Icons/DefaultUser";
import ChevronRight from "@/app/shared/Icons/ChevronRight";
import UserStats from "../UserStats/UserStats";
import { useSearchParams } from "next/navigation";

export default function UserCard() {
  const searchParams = useSearchParams();
  const isUserOpened = searchParams.get("user_opened") === "true";
  const { user } = useTelegram();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isUserOpened) {
      setOpen(true);
    }
  }, [isUserOpened]);

  return (
    <>
      <div className={styles.userCardWrapper}>
        <div className={styles.userCard} onClick={() => setOpen(true)}>
          <CustomFlex gap="10px" align="center" justify="space-between">
            {user?.photo_url ? (
              <Image
                src={user?.photo_url || ""}
                alt="user"
                width={80}
                height={80}
                unoptimized
                className={styles.userImage}
              />
            ) : (
              <DefaultUser className={styles.defaultUser} />
            )}
            <CustomFlex
              direction="column"
              justify="center"
              className={styles.userInfo}
            >
              <CustomTyphography fontSize="16px" fontWeight="bold">
                {user?.first_name} {user?.last_name}
              </CustomTyphography>
              <div>
                <CustomTyphography fontSize="14px" fontWeight="medium">
                  @{user?.username}
                </CustomTyphography>
              </div>
              <div className={styles.idWrapper}>
                <CustomTyphography
                  fontSize="14px"
                  fontWeight="medium"
                  color="gray"
                >
                  ID
                </CustomTyphography>
                <CustomTyphography fontSize="14px" fontWeight="medium">
                  {user?.id}
                </CustomTyphography>
              </div>
            </CustomFlex>
            <ChevronRight />
          </CustomFlex>
        </div>
      </div>

      <UserStats open={open} onDismiss={() => setOpen(false)} />
    </>
  );
}
