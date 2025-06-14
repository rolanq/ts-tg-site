import React from "react";
import styles from "./CustomLoader.module.css";

interface CustomLoaderProps {
  size?: number;
}

export default function CustomLoader({ size = 24 }: CustomLoaderProps) {
  return <span className={styles.loader} style={{ width: size, height: size }}></span>;
}
