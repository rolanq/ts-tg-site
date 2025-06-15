import React from "react";
import styles from "./CustomButton.module.css";
import classNames from "classnames";
import { CustomTyphography } from "../CustomTyphography/CustomTyphography";
import { CustomFlex } from "../CustomFlex/CustomFlex";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  stretched?: boolean;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  padding?: "small" | "medium" | "large" | "none";
  boxShadow?: boolean;
}

export const CustomButton = ({
  children,
  onClick,
  className,
  disabled,
  variant = "primary",
  stretched = false,
  beforeIcon,
  afterIcon,
  padding = "small",
  boxShadow = false,
}: CustomButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.();
  };

  return (
    <button
      className={classNames(styles.button, className, {
        [styles.disabled]: disabled,
        [styles.primary]: variant === "primary" && !disabled,
        [styles.secondary]: variant === "secondary" && !disabled,
        [styles.tertiary]: variant === "tertiary" && !disabled,
        [styles.stretched]: stretched,
        [styles.small]: padding === "small",
        [styles.medium]: padding === "medium",
        [styles.large]: padding === "large",
        [styles.none]: padding === "none",
        [styles.boxShadow]: boxShadow,
      })}
      onClick={handleClick}
      disabled={disabled}
    >
      <CustomFlex
        align="center"
        gap="10px"
        justify={stretched ? "center" : "start"}
        className={styles.wrapper}
      >
        {beforeIcon && <div className={styles.beforeIcon}>{beforeIcon}</div>}
        <CustomTyphography
          fontSize="16px"
          fontWeight="bold"
          color={variant === "tertiary" ? "black" : "white"}
          className={styles.text}
        >
          {children}
        </CustomTyphography>
        {afterIcon && <div className={styles.afterIcon}>{afterIcon}</div>}
      </CustomFlex>
    </button>
  );
};
