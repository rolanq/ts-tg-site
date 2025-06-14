import React, { useEffect, useState } from "react";
import styles from "./CustomSlider.module.css";
import classNames from "classnames";

interface CustomSliderProps {
  items: React.ReactNode[];
  className?: string;
}

export default function CustomSlider({ items, className }: CustomSliderProps) {
  return (
    <div className={classNames(styles.slider, className)}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          {item}
        </div>
      ))}
    </div>
  );
}
