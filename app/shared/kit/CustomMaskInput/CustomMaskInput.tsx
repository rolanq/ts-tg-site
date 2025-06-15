import React, { useCallback, useState } from "react";
import { CustomTyphography } from "../CustomTyphography/CustomTyphography";
import styles from "./CustomMaskInput.module.css";
import classNames from "classnames";
import { IMaskInput } from "react-imask";

interface ICustomInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  min?: number;
  max?: number;
  type?: "number" | "text";
  mask?: string;
  errorMessage?: string;
}

export default function CustomMaskInput({
  label,
  value,
  onChange,
  placeholder,
  className,
  type,
  mask,
  errorMessage: errorMessageProp,
}: ICustomInputProps) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(errorMessageProp);
  const handleChange = useCallback(
    (value: string) => {
      const extractedValue = value.replace(/\D/g, "");
      if (extractedValue.length < 11) {
        setError(true);
        setErrorMessage(errorMessageProp || "Неправильный ввод");
      } else {
        setError(false);
      }
      onChange(`+${extractedValue}`);
    },
    [onChange, errorMessageProp]
  );

  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <IMaskInput
        value={value}
        onAccept={handleChange}
        className={classNames(styles.input, className, {
          [styles.error]: error,
        })}
        placeholder={placeholder}
        type={type}
        mask={mask}
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
}
