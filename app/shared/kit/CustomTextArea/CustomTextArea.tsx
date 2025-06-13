import React from "react";
import styles from "./CustomTextArea.module.css";

interface CustomTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows?: number;
}

export const CustomTextArea = ({
  value,
  onChange,
  placeholder,
  rows = 3,
}: CustomTextAreaProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      rows={rows}
    />
  );
};
