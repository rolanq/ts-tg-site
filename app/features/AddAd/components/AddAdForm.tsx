"use client";

import { CustomBottomSheet } from "@/app/shared/kit/CustomBottomSheet/CustomBottomSheet";
import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./commonSteps.module.css";
import { FirstStep } from "./steps/firstStep/FirstStep";
import { AddAdContext } from "../context/AddAdContext";
import { SecondStep } from "./steps/SecondStep/SecondStep";
import { ThirdStep } from "./steps/thirdStep/ThirdStep";
import { FooterButtons } from "./FooterButtons";
import { FourthStep } from "./steps/fouthStep/FourthStep";
import CustomLoader from "@/app/shared/kit/CustomLoader/CustomLoader";
import classNames from "classnames";

export default function AddAdForm() {
  const { openedStep, setOpenedStep, isDraftLoading, isPublishing } =
    useContext(AddAdContext);

  const handleSlideChange = (event: any) => {
    const slideIndex = event.target.scrollLeft / event.target.offsetWidth;
    setOpenedStep(Math.round(slideIndex) + 1);
  };

  useEffect(() => {
    const stepsWrapper = document.querySelector(`.${styles.stepsWrapper}`);
    if (stepsWrapper) {
      stepsWrapper.addEventListener("scroll", handleSlideChange);
    }

    return () => {
      if (stepsWrapper) {
        stepsWrapper.removeEventListener("scroll", handleSlideChange);
      }
    };
  }, []);

  const content = useMemo(() => {
    if (isPublishing) {
      return (
        <CustomLoader
          size={36}
          label="Создаем объявление"
          className={styles.loader}
        />
      );
    }
    if (isDraftLoading) {
      return (
        <CustomLoader
          size={36}
          label="Загружаем черновик"
          className={styles.loader}
        />
      );
    }
    return (
      <div
        className={classNames(
          styles.stepsWrapper,
          styles[`slide${openedStep}`]
        )}
      >
        <div className={styles.step}>
          <FirstStep />
        </div>
        <div className={styles.step}>
          <SecondStep />
        </div>
        <div className={styles.step}>
          <ThirdStep />
        </div>
        <div className={styles.step}>
          <FourthStep />
        </div>
      </div>
    );
  }, [isDraftLoading, isPublishing, openedStep]);

  return (
    <CustomBottomSheet
      snap={75}
      open={!!openedStep}
      onDismiss={() => setOpenedStep(0)}
      footerWithoutBoxShadow
      disableDragClose
      footer={<FooterButtons />}
      closeIcon={false}
      disableScrollX
    >
      {content}
    </CustomBottomSheet>
  );
}
