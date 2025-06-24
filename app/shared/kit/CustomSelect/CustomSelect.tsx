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
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const scrollIntoViewWithContainer = () => {
    if (!selectRef.current) return;

    // Находим ближайший контейнер с прокруткой
    let element: HTMLElement = selectRef.current;
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
      const selectRect = selectRef.current.getBoundingClientRect();
      const scrollTop = scrollContainer.scrollTop;

      // Вычисляем позицию для центрирования
      const targetScroll =
        scrollTop +
        (selectRect.top - containerRect.top) -
        (containerRect.height - selectRect.height) / 2;

      scrollContainer.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    } else {
      // Если контейнер не найден, используем стандартный scrollIntoView
      selectRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
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

  return (
    <div className={classNames(styles.selectWrapper, className)}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        ref={selectRef}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
