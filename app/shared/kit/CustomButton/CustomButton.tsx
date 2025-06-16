import React from "react";
import styles from "./CustomButton.module.css";
import classNames from "classnames";
import { CustomTyphography } from "../CustomTyphography/CustomTyphography";
import { CustomFlex } from "../CustomFlex/CustomFlex";

const textColor = {
  primary: "white",
  secondary: "white",
  tertiary: "black",
  outline: "black",
} as const;

const textSize = {
  small: "14px",
  medium: "16px",
  large: "18px",
  none: "14px",
} as const;

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  stretched?: boolean;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  padding?: "small" | "medium" | "large" | "none";
  boxShadow?: boolean;
  align?: "center" | "start" | "end";
  isText?: boolean;
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
  align = "start",
  isText = true,
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
        [styles.outline]: variant === "outline" && !disabled,
        [styles.stretched]: stretched,
        [styles.small]: padding === "small",
        [styles.medium]: padding === "medium",
        [styles.large]: padding === "large",
        [styles.none]: padding === "none",
        [styles.boxShadow]: boxShadow,
        [styles.alignCenter]: align === "center",
        [styles.alignStart]: align === "start",
        [styles.alignEnd]: align === "end",
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
        {isText ? (
          <CustomTyphography
            fontSize={textSize[padding]}
            fontWeight="bold"
            color={textColor[variant]}
            className={styles.text}
          >
            {children}
          </CustomTyphography>
        ) : (
          children
        )}
        {afterIcon && <div className={styles.afterIcon}>{afterIcon}</div>}
      </CustomFlex>
    </button>
  );
};
