"use client";

import { CustomBottomSheet } from "@/app/shared/kit/CustomBottomSheet/CustomBottomSheet";
import { useContext } from "react";
import styles from "./commonSteps.module.css";
import { FirstStep } from "./steps/firstStep/FirstStep";
import { AddAdContext } from "../context/AddAdContext";
import { SecondStep } from "./steps/SecondStep/SecondStep";
import { ThirdStep } from "./steps/thirdStep/ThirdStep";
import { FooterButtons } from "./FooterButtons";
import { FourthStep } from "./steps/fouthStep/FourthStep";

export default function AddAdForm() {
  const { openedStep, setOpenedStep } = useContext(AddAdContext);

  return (
    <CustomBottomSheet
      snap={60}
      open={!!openedStep}
      onDismiss={() => setOpenedStep(0)}
      footerWithoutBoxShadow
      disableDragClose
      footer={<FooterButtons />}
    >
      <div className={`${styles.stepsWrapper} ${styles[`slide${openedStep}`]}`}>
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
    </CustomBottomSheet>
  );
}
