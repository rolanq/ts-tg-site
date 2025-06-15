import React from "react";
import { CustomTyphography } from "../CustomTyphography/CustomTyphography";
import styles from "./CustomBadge.module.css";
import classNames from "classnames";

const badgeColors = {
  success: "#008000",
  info: "gray",
  danger: "#FF0000",
};

interface CustomBadgeProps {
  text: string;
  variant: "success" | "info" | "danger";
  size?: "small" | "medium";
}

export default function CustomBadge({
  text,
  variant,
  size = "medium",
}: CustomBadgeProps) {
  return (
    <div
      className={classNames(styles.badge, styles[size])}
      style={{ backgroundColor: badgeColors[variant] }}
    >
      <CustomTyphography fontSize="14px" fontWeight="bold" color="white">
        {text}
      </CustomTyphography>
    </div>
  );
}
