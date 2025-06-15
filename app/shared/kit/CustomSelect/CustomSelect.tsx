import React, { ReactNode, useState } from "react";
import styles from "./CustomSelect.module.css";
import classNames from "classnames";

interface CustomSelectProps {
  options: { value: string; label: ReactNode }[];
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const CustomSelect = ({
  options,
  onChange,
  value,
  placeholder,
  label,
  disabled,
  className,
}: CustomSelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={classNames(styles.selectWrapper, className)}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        onChange={handleChange}
        value={value}
        className={classNames(styles.select)}
        disabled={disabled}
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
    </div>
  );
};
