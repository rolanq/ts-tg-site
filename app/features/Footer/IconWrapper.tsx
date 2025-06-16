import React from "react";
import styles from "./Footer.module.css";
import classNames from "classnames";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";

export const IconWrapper = ({
  icon,
  isActive,
}: {
  icon: React.ReactNode;
  isActive: boolean;
}) => {
  return (
    <CustomButton
      className={classNames({
        [styles.activeIconButton]: isActive,
        [styles.notActiveIconButton]: !isActive,
      })}
      isText={false}
    >
      {icon}
    </CustomButton>
  );
};
