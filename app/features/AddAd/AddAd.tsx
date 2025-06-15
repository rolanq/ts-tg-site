"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./AddAd.module.css";
import { PlusIcon } from "../../shared/Icons/PlusIcon";
import AddAdForm from "./components/AddAdForm";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { AddAdContext } from "./context/AddAdContext";
import {
  checkIsFirstStepValid,
  checkIsSecondStepValid,
  checkIsThirdStepValid,
  isAvailableToPublish,
} from "./components/utils";

export const AddAd = () => {
  const { setOpenedStep, preparedData, isDraftLoading, openedStep } =
    useContext(AddAdContext);
  const [mounted, setMounted] = useState(false);

  const handleOpenAddAd = useCallback(() => {
    if (isAvailableToPublish(preparedData)) {
      setOpenedStep(4);
      return;
    } else if (!checkIsFirstStepValid(preparedData)) {
      setOpenedStep(1);
      return;
    } else if (!checkIsSecondStepValid(preparedData)) {
      setOpenedStep(2);
      return;
    } else if (!checkIsThirdStepValid(preparedData)) {
      setOpenedStep(3);
      return;
    }
  }, [preparedData, setOpenedStep]);

  useEffect(() => {
    if (!!openedStep && !isDraftLoading && !mounted) {
      handleOpenAddAd();
      setMounted(true);
    }
  }, [isDraftLoading, handleOpenAddAd, openedStep]);

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
