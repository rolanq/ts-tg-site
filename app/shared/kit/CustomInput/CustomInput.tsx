import React, { useCallback, useState } from "react";
import styles from "./CustomInput.module.css";
import classNames from "classnames";
import { CustomTyphography } from "../CustomTyphography/CustomTyphography";

interface ICustomInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  min?: number;
  max?: number;
  type?: "number" | "text";
  errorMessage?: string;
  isNegative?: boolean;
  checkValue?: (value: string) => boolean;
}

export const CustomInput = ({
  value,
  onChange,
  placeholder,
  type = "text",
  className,
  label,
  min,
  max,
  errorMessage: errorMessageProp,
  isNegative = false,
  checkValue,
}: ICustomInputProps) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(errorMessageProp);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (type === "number") {
        const numValue = Number(value);

        if (value === "" || value === "-") {
          setError(false);
          setErrorMessage("");
          onChange("0");
          return;
        }

        if (min && numValue < min) {
          onChange(min.toString());
          return;
        }

        if (max && numValue > max) {
          onChange(max.toString());
          return;
        }

        setError(false);
        setErrorMessage("");
        onChange(numValue.toString());
      } else {
        if (value === "") {
          setError(false);
          setErrorMessage("");
          onChange("");
          return;
        }

        if (checkValue && !checkValue(value)) {
          setError(true);
          setErrorMessage(errorMessageProp || "Неправильный ввод");
          onChange(value);
          return;
        }

        setError(false);
        setErrorMessage("");
        onChange(value);
      }
    },
    [min, max, type, onChange, setError, setErrorMessage, errorMessageProp]
  );

  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        value={value}
        onChange={handleChange}
        className={classNames(styles.input, className, {
          [styles.error]: error,
        })}
        placeholder={placeholder}
        type={type}
      />
      {error && (
        <CustomTyphography
          fontSize="12px"
          fontWeight="light"
          color="red"
          className={styles.errorMessage}
        >
          {errorMessage}
        </CustomTyphography>
      )}
    </div>
  );
};
