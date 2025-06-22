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
  strictCheck?: boolean;
  withDelimeter?: boolean;
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
  strictCheck = true,
  withDelimeter = true,
}: ICustomInputProps) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(errorMessageProp);

  const formatNumberWithDots = (value: string): string => {
    if (!withDelimeter || type !== "number") return value;
    const numStr = value.replace(/\./g, "");
    if (!numStr) return "";
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const removeDotsFromNumber = (value: string): string => {
    return value.replace(/\./g, "");
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      if (type === "number") {
        value = removeDotsFromNumber(value);

        if (value === "" || value === "-") {
          setError(false);
          setErrorMessage("");
          onChange("0");
          return;
        }

        const numValue = Number(value);

        if (strictCheck) {
          if (min && numValue < min) {
            onChange(min.toString());
            return;
          }

          if (max && numValue > max) {
            onChange(max.toString());
            return;
          }
        } else {
          if (min && numValue < min) {
            setError(true);
            setErrorMessage(`Значение должно быть больше ${min}`);
          } else if (max && numValue > max) {
            setError(true);
            setErrorMessage(`Значение должно быть меньше ${max}`);
          } else {
            setError(false);
            setErrorMessage("");
          }

          onChange(numValue.toString());
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
    [
      min,
      max,
      type,
      onChange,
      setError,
      setErrorMessage,
      errorMessageProp,
      withDelimeter,
    ]
  );

  const displayValue = formatNumberWithDots(value);

  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        value={displayValue}
        onChange={handleChange}
        className={classNames(styles.input, className, {
          [styles.error]: error,
        })}
        placeholder={placeholder}
        type="text"
        inputMode={type === "number" ? "numeric" : "text"}
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
