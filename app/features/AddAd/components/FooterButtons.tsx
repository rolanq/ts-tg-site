import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import React, { useContext, useEffect, useState } from "react";
import { AddAdContext } from "../context/AddAdContext";
import styles from "./commonSteps.module.css";
import { isAvailableToPublish } from "./utils";

export const FooterButtons = () => {
  const {
    openedStep,
    setOpenedStep,
    isNextStepDisabled,
    onClickNextStep,
    preparedData,
    isDraftLoading,
  } = useContext(AddAdContext);

  const [isPublishDisabled, setIsPublishDisabled] = useState(true);

  const handleBackStep = () => {
    setOpenedStep((prev) => prev - 1);
  };

  const handlePublish = () => {
    console.log("publish");
  };

  useEffect(() => {
    if (isAvailableToPublish(preparedData)) {
      setIsPublishDisabled(false);
    } else {
      setIsPublishDisabled(true);
    }
  }, [preparedData]);

  if (isDraftLoading) {
    return null;
  }

  return (
    <CustomFlex gap="10px">
      {openedStep > 1 && (
        <CustomButton
          className={styles.backStepButton}
          onClick={handleBackStep}
          variant="secondary"
          padding="medium"
        >
          Назад
        </CustomButton>
      )}
      {openedStep < 4 && (
        <CustomButton
          className={styles.nextStepButton}
          onClick={onClickNextStep}
          disabled={isNextStepDisabled}
          stretched
          padding="medium"
        >
          Далее
        </CustomButton>
      )}
      {openedStep === 4 && (
        <CustomButton
          className={styles.nextStepButton}
          onClick={handlePublish}
          stretched
          padding="medium"
          disabled={isPublishDisabled}
        >
          Опубликовать
        </CustomButton>
      )}
    </CustomFlex>
  );
};
