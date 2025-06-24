import React, { ReactNode, useState, useRef } from "react";
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
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    selectRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className={classNames(styles.selectWrapper, className)}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        ref={selectRef}
        onChange={handleChange}
        onFocus={handleFocus}
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
