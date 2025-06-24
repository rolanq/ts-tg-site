"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import styles from "./CustomBottomSheet.module.css";
import "react-spring-bottom-sheet/dist/style.css";
import "./override.css";
import classNames from "classnames";
import { CustomButton } from "../CustomButton/CustomButton";
import CloseIcon from "../../Icons/CloseIcon";
import { SpringEvent } from "react-spring-bottom-sheet/dist/types";

interface IProps {
  open: boolean;
  onDismiss: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  snap?: number;
  footerWithoutBoxShadow?: boolean;
  closeIcon?: boolean;
  disableDragClose?: boolean;
  disableScrollX?: boolean;
  onSpringEnd?: (event: SpringEvent) => void;
  disableDismiss?: boolean;
}

export const CustomBottomSheet: FC<IProps> = ({
  open,
  onDismiss,
  onSpringEnd,
  children,
  footer,
  snap = 30,
  footerWithoutBoxShadow,
  closeIcon = true,
  disableDragClose = true,
  disableScrollX = false,
  disableDismiss = false,
}) => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [initialViewportHeight, setInitialViewportHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const height = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      setViewportHeight(height);
      setInitialViewportHeight(height);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      setIsKeyboardVisible(initialViewportHeight - currentHeight > 150);
      setViewportHeight(currentHeight);
    };

    window.addEventListener("resize", handleResize);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, [initialViewportHeight]);

  useEffect(() => {
    const overlay = document.querySelector("[data-rsbs-backdrop]");

    const handleClick = (event: Event) => {
      event.stopPropagation();
      event.preventDefault();

      if (!disableDismiss) {
        onDismiss();
      }
    };

    if (overlay) {
      overlay.addEventListener("click", handleClick, { capture: true });
    }

    return () => {
      if (overlay) {
        overlay.removeEventListener("click", handleClick, { capture: true });
      }
    };
  }, [onDismiss, disableDismiss]);

  if (viewportHeight === 0) {
    return null;
  }

  return (
    <BottomSheet
      className={classNames(
        footerWithoutBoxShadow && styles.footerWithoutBoxShadow,
        disableScrollX && styles.disableScrollX
      )}
      footer={footer}
      ref={bottomSheetRef}
      scrollLocking
      expandOnContentDrag={!disableDragClose}
      defaultSnap={(viewportHeight / 100) * snap}
      snapPoints={() => [(viewportHeight / 100) * snap]}
      maxHeight={viewportHeight}
      open={open}
      onDismiss={() => {}}
      onSpringEnd={onSpringEnd}
    >
      {closeIcon && (
        <CustomButton
          className={styles.closeButton}
          onClick={onDismiss}
          stretched
          align="center"
          isText={false}
        >
          <CloseIcon />
        </CustomButton>
      )}
      {children}
    </BottomSheet>
  );
};
