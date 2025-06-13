import React from "react";
import styles from "./CustomInput.module.css";

interface ICustomInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}

export const CustomInput = ({
  value,
  onChange,
  placeholder,
  type,
  className,
}: ICustomInputProps) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${styles.input} ${className}`}
      placeholder={placeholder}
      type={type}
    />
  );
};
