import React, { useCallback, useState, useRef } from "react";
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
  inputClassName?: string;
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

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

  const scrollIntoViewWithContainer = () => {
    if (!inputRef.current) return;

    // Находим ближайший контейнер с прокруткой
    let element: HTMLElement = inputRef.current;
    let scrollContainer: HTMLElement | null = null;

    while (element.parentElement) {
      const { overflowY } = window.getComputedStyle(element.parentElement);
      if (overflowY === "auto" || overflowY === "scroll") {
        scrollContainer = element.parentElement;
        break;
      }
      element = element.parentElement;
    }

    // Если нашли контейнер с прокруткой, используем scrollIntoView с этим контейнером
    if (scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const inputRect = inputRef.current.getBoundingClientRect();
      const scrollTop = scrollContainer.scrollTop;

      // Вычисляем позицию для центрирования
      const targetScroll =
        scrollTop +
        (inputRect.top - containerRect.top) -
        (containerRect.height - inputRect.height) / 2;

      scrollContainer.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    } else {
      // Если контейнер не найден, используем стандартный scrollIntoView
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleFocus = () => {
    // Если клавиатура уже видима, скроллим сразу
    if (isKeyboardVisible) {
      scrollIntoViewWithContainer();
      return;
    }

    // Если это первый фокус (клавиатура еще не открыта),
    // ждем немного, чтобы клавиатура успела открыться
    setIsKeyboardVisible(true);
    setTimeout(() => {
      scrollIntoViewWithContainer();
    }, 200); // Подождем 300мс пока клавиатура откроется
  };

  // Сбрасываем состояние клавиатуры при потере фокуса
  const handleBlur = () => {
    setIsKeyboardVisible(false);
  };

  const displayValue = formatNumberWithDots(value);

  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        ref={inputRef}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
