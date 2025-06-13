import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import React, { useContext } from "react";
import { AddAdContext } from "../context/AddAdContext";
import styles from "./commonSteps.module.css";

export const FooterButtons = () => {
  const { openedStep, setOpenedStep } = useContext(AddAdContext);

  const handleNextStep = () => {
    setOpenedStep((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setOpenedStep((prev) => prev - 1);
  };

  const handlePublish = () => {
    console.log("publish");
  };

  return (
    <CustomFlex gap="10px">
      {openedStep > 1 && (
        <CustomButton
          className={styles.backStepButton}
          onClick={handleBackStep}
        >
          Назад
        </CustomButton>
      )}
      {openedStep < 4 && (
        <CustomButton
          className={styles.nextStepButton}
          onClick={handleNextStep}
        >
          Далее
        </CustomButton>
      )}
      {openedStep === 4 && (
        <CustomButton className={styles.nextStepButton} onClick={handlePublish}>
          Опубликовать
        </CustomButton>
      )}
    </CustomFlex>
  );
};
