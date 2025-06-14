import React from "react";
import styles from "./CustomSlider.module.css";

interface CustomSliderProps {
  items: React.ReactNode[];
}

export default function CustomSlider({ items }: CustomSliderProps) {
  return (
    <div className={styles.slider}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          {item}
        </div>
      ))}
    </div>
  );
}
