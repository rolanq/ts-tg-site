import React from "react";
import styles from "./CustomFlex.module.css";

interface CustomFlexProps {
  children: React.ReactNode;
  direction?: "row" | "column";
  justify?: "start" | "center" | "end" | "space-between" | "space-around";
  align?: "start" | "center" | "end" | "space-between" | "space-around";
  gap?: string;
  className?: string;
}

export const CustomFlex = ({
  children,
  direction = "row",
  justify,
  align,
  gap,
  className,
}: CustomFlexProps) => {
  return (
    <div
      style={{
        gap: gap,
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction,
      }}
      className={`${styles.flex} ${className}`}
    >
      {children}
    </div>
  );
};
