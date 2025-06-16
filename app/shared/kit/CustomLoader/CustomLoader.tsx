import React, { useState } from "react";
import styles from "./CustomLoader.module.css";
import { CustomTyphography } from "../CustomTyphography/CustomTyphography";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import DoneIcon from "../../Icons/Loader/DoneIcon";
import LoadingIcon from "../../Icons/Loader/LoadingIcon";

interface CustomLoaderProps {
  size?: number;
  label?: string;
  className?: string;
  loading?: boolean;
  successLabel?: string;
}

export default function CustomLoader({
  size = 24,
  label,
  className,
  loading,
  successLabel,
}: CustomLoaderProps) {
  const [showDone, setShowDone] = useState(false);

  return (
    <div className={classNames(styles.loaderWrapper, className)}>
      <CSSTransition
        in={loading}
        timeout={100}
        classNames={{
          exit: styles.loaderExit,
          exitActive: styles.loaderExitActive,
        }}
        unmountOnExit
        onExited={() => setShowDone(true)}
      >
        <div className={styles.loaderWrapper}>
          <LoadingIcon className={styles.loader} animateDone={!loading} />
          {label && (
            <CustomTyphography
              fontSize="14px"
              fontWeight="light"
              textAlign="center"
              textWrap="wrap"
              className={styles.label}
            >
              {label}
            </CustomTyphography>
          )}
        </div>
      </CSSTransition>

      <CSSTransition
        in={showDone && !loading}
        timeout={100}
        classNames={{
          enter: styles.loaderEnter,
          enterActive: styles.loaderEnterActive,
        }}
        unmountOnExit
        onExited={() => setShowDone(false)}
      >
        <div className={styles.loaderWrapper}>
          <DoneIcon className={styles.doneIcon} />
          <CustomTyphography
            fontSize="14px"
            fontWeight="light"
            textAlign="center"
            textWrap="wrap"
            className={styles.label}
          >
            {successLabel}
          </CustomTyphography>
        </div>
      </CSSTransition>
    </div>
  );
}
