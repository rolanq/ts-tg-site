import React, { ReactNode, useState } from "react";
import styles from "./CustomSelect.module.css";

interface CustomSelectProps {
  options: { value: string; label: ReactNode }[];
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
}

export const CustomSelect = ({
  options,
  onChange,
  value,
  placeholder,
}: CustomSelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      onChange={handleChange}
      value={value}
      className={`${styles.select} ${!value ? styles.placeholderColor : ""}`}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
