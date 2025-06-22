"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./CustomSlider.module.css";
import classNames from "classnames";

interface CustomSliderProps {
  items: React.ReactNode[];
  className?: string;
}

export default function CustomSlider({ items, className }: CustomSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Создаем массив с дублированными элементами для бесконечной прокрутки
  const extendedItems = [...items, ...items, ...items];

  const scrollToSlide = (index: number) => {
    if (sliderRef.current && !isTransitioning) {
      setIsTransitioning(true);
      const slideWidth = sliderRef.current.clientWidth;

      // Обновляем активный слайд
      setActiveSlide(index);

      // Прокручиваем к слайду в центральном наборе элементов
      sliderRef.current.style.scrollBehavior = "smooth";
      sliderRef.current.scrollLeft = slideWidth * (index + items.length);

      // Сбрасываем флаг перехода
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      // Устанавливаем начальную позицию на центральный набор элементов
      slider.scrollLeft = slider.clientWidth * items.length;
    }
  }, [items.length]);

  // Функция для клонирования и модификации видео элементов
  const processIndicatorContent = (
    content: React.ReactNode
  ): React.ReactNode => {
    if (React.isValidElement(content)) {
      const element = content as React.ReactElement;

      if (element.type === "video") {
        return React.cloneElement(element, {
          muted: true,
          controls: false,
          autoplay: false,
          playsInline: true,
          onClick: (e: React.MouseEvent) => e.preventDefault(),
          style: { pointerEvents: "none" },
        });
      }

      if (element.props.children) {
        return React.cloneElement(element, {
          ...element.props,
          className: classNames(styles.indicator, element.props.className),
          children: React.Children.map(
            element.props.children,
            processIndicatorContent
          ),
        });
      }
    }
    return content;
  };

  return (
    <div className={styles.sliderContainer}>
      <div ref={sliderRef} className={classNames(styles.slider, className)}>
        {extendedItems.map((item, index) => (
          <div key={index} className={styles.item}>
            {item}
          </div>
        ))}
      </div>
      <div className={styles.indicators}>
        {items.map((item, index) => (
          <div
            key={index}
            className={classNames(
              styles.indicator,
              index === activeSlide && styles.indicatorActive
            )}
            onClick={() => scrollToSlide(index)}
          >
            {processIndicatorContent(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
