import React from "react";
import styles from "./Loader.module.css";

interface DoneIconProps {
  className?: string;
  size?: number;
}

export default function DoneIcon({ className, size = 48 }: DoneIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${styles.doneIcon} ${className}`}
    >
      <path
        d="M9 24L19 34L39 14"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
