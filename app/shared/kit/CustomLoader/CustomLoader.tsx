import React from "react";
import styles from "./CustomLoader.module.css";
import { CustomTyphography } from "../CustomTyphography/CustomTyphography";
import classNames from "classnames";

interface CustomLoaderProps {
  size?: number;
  label?: string;
  className?: string;
}

export default function CustomLoader({
  size = 24,
  label,
  className,
}: CustomLoaderProps) {
  return (
    <div className={classNames(styles.loaderWrapper, className)}>
      <span
        className={styles.loader}
        style={{ width: size, height: size }}
      ></span>
      {label && (
        <CustomTyphography fontSize="14px" fontWeight="light">
          {label}
        </CustomTyphography>
      )}
    </div>
  );
}
