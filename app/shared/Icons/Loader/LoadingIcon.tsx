import React from "react";
import styles from "./Loader.module.css";

interface LoadingIconProps {
  className?: string;
  animateDone?: boolean;
}

export default function LoadingIcon({
  className,
  animateDone,
}: LoadingIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        className={animateDone ? styles.loaderPath : undefined}
        d="M21 12a9 9 0 1 1-6.219-8.56"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
