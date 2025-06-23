import React from "react";
import { CustomButton } from "../CustomButton/CustomButton";
import { CustomFlex } from "../CustomFlex/CustomFlex";
import styles from "./CustomSegment.module.css";
import classNames from "classnames";

interface CustomSegmentControlProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  className?: string;
}

export default function CustomSegmentControl({
  options,
  selectedOption,
  onSelect,
  className,
}: CustomSegmentControlProps) {
  return (
    <CustomFlex className={classNames(styles.segment, className)}>
      {options.map((option) => (
        <CustomButton
          key={option}
          onClick={() => onSelect(option)}
          variant={selectedOption === option ? "primary" : "outline"}
          stretched
          padding="small"
          className={classNames(styles.segmentButton, {
            [styles.selected]: selectedOption === option,
          })}
        >
          {option}
        </CustomButton>
      ))}
    </CustomFlex>
  );
}
