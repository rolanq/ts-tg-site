import React from "react";
import styles from "./CustomFlex.module.css";

interface CustomFlexProps {
  children: React.ReactNode;
  direction?: "row" | "column";
  justify?: "start" | "center" | "end" | "space-between" | "space-around";
  align?: "start" | "center" | "end" | "space-between" | "space-around";
  gap?: string;
  className?: string;
  height?: string;
  width?: string;
  onClick?: () => void;
}

export const CustomFlex = ({
  children,
  direction = "row",
  justify,
  align,
  gap,
  className,
  height,
  width,
  onClick,
}: CustomFlexProps) => {
  return (
    <div
      style={{
        gap: gap,
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction,
        height,
        width,
      }}
      className={`${styles.flex} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
