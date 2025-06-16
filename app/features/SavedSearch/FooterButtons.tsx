import React, { useEffect, useMemo, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styles from "./SavedSearch.module.css";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";

interface IFooterButtonsProps {
  onDismiss: () => void;
  handleSave: () => void;
  isLoading: boolean;
  isUpdating: boolean;
}

export default function FooterButtons({
  onDismiss,
  handleSave,
  isLoading,
  isUpdating,
}: IFooterButtonsProps) {
  const [isShowButtons, setIsShowButtons] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsShowButtons(true);
    } else {
      setIsShowButtons(false);
    }
  }, [isLoading]);

  const content = useMemo(() => {
    return (
      <CustomFlex justify="center" gap="10px">
        <CustomButton
          variant="secondary"
          stretched
          padding="small"
          onClick={onDismiss}
        >
          Закрыть
        </CustomButton>
        <CustomButton
          stretched
          padding="small"
          onClick={handleSave}
          disabled={isUpdating}
        >
          Сохранить
        </CustomButton>
      </CustomFlex>
    );
  }, [isUpdating, onDismiss, handleSave]);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={isShowButtons ? "content" : "loader"}
        timeout={300}
        classNames={{
          enter: styles.footerFadeEnter,
          enterActive: styles.footerFadeEnterActive,
          exit: styles.footerFadeExit,
          exitActive: styles.footerFadeExitActive,
        }}
      >
        {isShowButtons ? content : <div></div>}
      </CSSTransition>
    </SwitchTransition>
  );
}
