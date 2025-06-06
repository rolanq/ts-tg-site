"use client";
import React, { FC, useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import styles from "./styles.module.css";
import "react-spring-bottom-sheet/dist/style.css";
import "./override.css";
import classNames from "classnames";

interface IProps {
  open: boolean;
  onDismiss: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  snap?: number;
  footerWithoutBoxShadow?: boolean;
  closeIcon?: boolean;
  disableDragClose?: boolean;
}

export const CustomBottomSheet: FC<IProps> = ({
  open,
  onDismiss,
  children,
  footer,
  snap = 30,
  footerWithoutBoxShadow,
  closeIcon = true,
  disableDragClose = false,
}) => {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setViewportHeight(
        Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0
        )
      );
    }
  }, []);

  if (viewportHeight === 0) {
    return null;
  }

  return (
    <BottomSheet
      className={classNames(
        footerWithoutBoxShadow && styles.footerWithoutBoxShadow
      )}
      footer={footer}
      scrollLocking
      expandOnContentDrag={!disableDragClose}
      defaultSnap={(viewportHeight / 100) * snap}
      snapPoints={() => [(viewportHeight / 100) * snap]}
      maxHeight={(viewportHeight / 100) * snap}
      open={open}
      onDismiss={onDismiss}
    >
      {children}
    </BottomSheet>
  );
};
