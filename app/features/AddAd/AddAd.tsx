"use client";
import React, { useContext } from "react";
import styles from "./AddAd.module.css";
import { PlusIcon } from "../../shared/Icons/PlusIcon";
import AddAdForm from "./components/AddAdForm";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { AddAdContext } from "./context/AddAdContext";

export const AddAd = () => {
  const { setOpenedStep } = useContext(AddAdContext);

  const handleOpenAddAd = () => {
    setOpenedStep(1);
  };

  return (
    <>
      <CustomFlex className={styles.footerItem} justify="center">
        <CustomButton onClick={handleOpenAddAd} className={styles.addButton}>
          <PlusIcon color="var(--color-white)" />
        </CustomButton>
      </CustomFlex>

      <AddAdForm />
    </>
  );
};
