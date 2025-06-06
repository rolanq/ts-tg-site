import { IconButton } from "@chakra-ui/react";
import React from "react";
import styles from "./Footer.module.css";
import classNames from "classnames";

export const IconWrapper = ({
  icon,
  isActive,
}: {
  icon: React.ReactNode;
  isActive: boolean;
}) => {
  return (
    <IconButton
      variant="plain"
      size="md"
      aria-label="Add Ad"
      className={classNames({
        [styles.activeIconButton]: isActive,
        [styles.notActiveIconButton]: !isActive,
      })}
      borderRadius={"12px"}
      padding={"8px"}
      boxShadow={isActive ? "0px 0.5px 0px 0px rgba(0, 0, 0, 0.2)" : "none"}
    >
      {icon}
    </IconButton>
  );
};
