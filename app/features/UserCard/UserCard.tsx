"use client";
import { useTelegram } from "@/app/shared/hooks/useTelegram";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import React from "react";
import styles from "./UserCard.module.css";

export default function UserCard() {
  const { user } = useTelegram();

  return (
    <div className={styles.userCardWrapper}>
      <div className={styles.userCard}>
        <CustomTyphography>
          {user?.first_name} {user?.last_name}
        </CustomTyphography>
      </div>
    </div>
  );
}
