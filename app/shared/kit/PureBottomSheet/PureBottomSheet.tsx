"use client";
import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import styles from "./PureBottomSheet.module.css";
import { CustomButton } from "../CustomButton/CustomButton";
import CloseIcon from "../../Icons/CloseIcon";

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
  disableDismiss?: boolean;
}

export const PureBottomSheet: FC<IProps> = ({
  open,
  onDismiss,
  children,
  footer,
  snap = 30,
  footerWithoutBoxShadow,
  closeIcon = true,
  disableDragClose = false,
  disableScrollX = false,
  disableDismiss = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isShowContent, setIsShowContent] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setViewportHeight(
        Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0
        )
      );
    }
    return () => setMounted(false);
  }, []);

  // Управление блокировкой прокрутки body
  useEffect(() => {
    if (open) {
      document.body.classList.add(styles.bodyLock);
    } else {
      document.body.classList.remove(styles.bodyLock);
    }

    return () => {
      document.body.classList.remove(styles.bodyLock);
    };
  }, [open]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disableDragClose) return;
      setIsDragging(true);
      setStartY(e.touches[0].clientY);
    },
    [disableDragClose]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || disableDragClose) return;
      setCurrentY(e.touches[0].clientY - startY);
    },
    [isDragging, startY, disableDragClose]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging || disableDragClose) return;
    setIsDragging(false);
    if (currentY > 100) {
      onDismiss();
    }
    setCurrentY(0);
  }, [currentY, isDragging, onDismiss, disableDragClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disableDismiss) {
        onDismiss();
      }
    },
    [disableDismiss, onDismiss]
  );

  const sheetStyle = {
    height: `${snap}vh`,
    transform: currentY ? `translateY(${currentY}px)` : undefined,
  };

  const content = useMemo(() => {
    return (
      <CSSTransition
        in={open}
        timeout={300}
        classNames={{
          enter: styles["container-enter"],
          enterActive: styles["container-enter-active"],
          exit: styles["container-exit"],
          exitActive: styles["container-exit-active"],
          exitDone: styles["container-exit-done"],
        }}
        onEnter={() => setIsShowContent(true)}
        onExiting={() => setIsShowContent(false)}
        unmountOnExit
      >
        <div className={styles.container} onClick={handleBackdropClick}>
          <CSSTransition
            in={isShowContent}
            timeout={300}
            classNames={{
              enter: styles["sheet-enter"],
              enterActive: styles["sheet-enter-active"],
              exit: styles["sheet-exit"],
              exitActive: styles["sheet-exit-active"],
            }}
          >
            <div
              className={`
            ${styles.sheet}
            ${footerWithoutBoxShadow ? styles.noShadow : ""}
            ${disableScrollX ? styles.noScrollX : ""}
          `}
              style={sheetStyle}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
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
              <div className={styles.content}>{children}</div>
              {footer && <div className={styles.footer}>{footer}</div>}
            </div>
          </CSSTransition>
        </div>
      </CSSTransition>
    );
  }, [
    open,
    children,
    footer,
    footerWithoutBoxShadow,
    disableScrollX,
    closeIcon,
    onDismiss,
    currentY,
    sheetStyle,
  ]);

  if (!mounted || viewportHeight === 0) {
    return null;
  }

  return createPortal(content, document.body);
};
