"use client";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AddAdContext } from "../context/AddAdContext";
import styles from "./commonSteps.module.css";
import { isAvailableToPublish } from "./utils";
import { sendPhotos, sendVideo } from "@/app/services/ClientTelegram";
import { updateDraft } from "@/app/services/Draft";
import { publishAd } from "@/app/services/Ads";
import toast from "react-hot-toast";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export const FooterButtons = () => {
  const {
    openedStep,
    setOpenedStep,
    isNextStepDisabled,
    onClickNextStep,
    preparedData,
    isDraftLoading,
    isPublishing,
    preparedVideo,
    preparedPhotos,
    setIsPublishing,
  } = useContext(AddAdContext);
  const [isPublishDisabled, setIsPublishDisabled] = useState(true);
  const [isShowButtons, setIsShowButtons] = useState(false);

  const handleBackStep = () => {
    setOpenedStep((prev) => prev - 1);
  };

  const handlePublish = useCallback(async () => {
    setIsPublishing(true);
    const filteredPhotos = preparedPhotos.filter(
      (photo) => !photo.name.startsWith("https")
    );
    const photosIds = await sendPhotos(filteredPhotos);

    const isVideoAlreadyUploaded = preparedVideo?.name.startsWith("https");
    const videoId =
      !isVideoAlreadyUploaded && preparedVideo
        ? await sendVideo(preparedVideo)
        : preparedData.video;

    updateDraft(Number(preparedData.userId), {
      ...preparedData,
      photos: photosIds,
      video: videoId,
    }).then(async () => {
      const newAd = await publishAd(Number(preparedData.userId));
      if (newAd.id) {
        setIsPublishing(false);
        setOpenedStep(0);
        toast.success("Объявление успешно создано", { duration: 3000 });
      }
    });
  }, [preparedPhotos, preparedVideo, preparedData]);

  useEffect(() => {
    if (isAvailableToPublish(preparedData)) {
      setIsPublishDisabled(false);
    } else {
      setIsPublishDisabled(true);
    }
  }, [preparedData]);

  useEffect(() => {
    if (!isDraftLoading && !isPublishing) {
      const timer = setTimeout(() => {
        setIsShowButtons(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setIsShowButtons(false);
    }
  }, [isDraftLoading, isPublishing]);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={isShowButtons ? "buttons" : "loader"}
        timeout={300}
        classNames={{
          enter: styles.fadeFooterEnter,
          enterActive: styles.fadeFooterEnterActive,
          exit: styles.fadeFooterExit,
          exitActive: styles.fadeFooterExitActive,
        }}
      >
        {isShowButtons ? (
          <CustomFlex gap="10px" className={styles.buttonsWrapper}>
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
        ) : (
          <div></div>
        )}
      </CSSTransition>
    </SwitchTransition>
  );
};
