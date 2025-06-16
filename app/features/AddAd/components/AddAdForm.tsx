"use client";

import { CustomBottomSheet } from "@/app/shared/kit/CustomBottomSheet/CustomBottomSheet";
import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./commonSteps.module.css";
import { FirstStep } from "./steps/firstStep/FirstStep";
import { AddAdContext } from "../../../context/AddAdContext";
import { SecondStep } from "./steps/SecondStep/SecondStep";
import { ThirdStep } from "./steps/thirdStep/ThirdStep";
import { FooterButtons } from "./FooterButtons";
import { FourthStep } from "./steps/fouthStep/FourthStep";
import CustomLoader from "@/app/shared/kit/CustomLoader/CustomLoader";
import classNames from "classnames";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export default function AddAdForm() {
  const {
    openedStep,
    setOpenedStep,
    isDraftLoading,
    isPublishing,
    setPreparedPhotos,
    setPreparedVideo,
  } = useContext(AddAdContext);

  const [showBottomSheet, setShowBottomSheet] = useState(false);

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

  useEffect(() => {
    if (!isDraftLoading) {
      const timer = setTimeout(() => {
        setShowBottomSheet(true);
      }, 700);

      return () => clearTimeout(timer);
    } else {
      setShowBottomSheet(false);
    }
  }, [isDraftLoading]);

  return (
    <CustomBottomSheet
      snap={75}
      open={!!openedStep}
      onDismiss={() => setOpenedStep(0)}
      onSpringEnd={(event) => {
        if (event.type === "CLOSE") {
          setPreparedPhotos([]);
          setPreparedVideo(null);
        }
      }}
      footerWithoutBoxShadow
      disableDragClose
      footer={<FooterButtons />}
      closeIcon={false}
      disableScrollX
    >
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={!showBottomSheet ? "loader" : "content"}
          timeout={300}
          classNames={{
            enter: styles.fadeEnter,
            enterActive: styles.fadeEnterActive,
            exit: styles.fadeExit,
            exitActive: classNames(styles.fadeExitActive),
          }}
        >
          {!showBottomSheet ? (
            <div className={styles.loaderWrapper}>
              <CustomLoader
                size={36}
                label="Загружаем черновик"
                successLabel="Черновик загружен"
                className={styles.loader}
                loading={isDraftLoading}
              />
            </div>
          ) : (
            <>
              {isPublishing ? (
                <div className={styles.loaderWrapper}>
                  <CustomLoader
                    size={36}
                    label="Создаем объявление"
                    successLabel="Объявление создано"
                    loading={isPublishing}
                  />
                </div>
              ) : (
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
              )}
            </>
          )}
        </CSSTransition>
      </SwitchTransition>
    </CustomBottomSheet>
  );
}
