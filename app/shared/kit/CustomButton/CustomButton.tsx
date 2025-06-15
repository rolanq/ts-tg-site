import React from "react";
import styles from "./CustomButton.module.css";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const CustomButton = ({
  children,
  onClick,
  className,
}: CustomButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.();
  };

  return (
    <button className={`${styles.button} ${className}`} onClick={handleClick}>
      {children}
    </button>
  );
};
