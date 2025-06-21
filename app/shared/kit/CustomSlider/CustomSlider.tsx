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

  const handleScroll = () => {
    if (sliderRef.current && !isTransitioning) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const slideWidth = sliderRef.current.clientWidth;
      const totalWidth = slideWidth * items.length;

      // Вычисляем текущий индекс слайда
      let newActiveSlide = Math.round(scrollLeft / slideWidth) % items.length;

      // Если прокрутили до конца вправо
      if (scrollLeft >= totalWidth * 2) {
        setIsTransitioning(true);
        sliderRef.current.style.scrollBehavior = "auto";
        sliderRef.current.scrollLeft = scrollLeft - totalWidth;
        setTimeout(() => {
          sliderRef.current!.style.scrollBehavior = "smooth";
          setIsTransitioning(false);
        }, 0);
      }
      // Если прокрутили до конца влево
      else if (scrollLeft <= 0) {
        setIsTransitioning(true);
        sliderRef.current.style.scrollBehavior = "auto";
        sliderRef.current.scrollLeft = totalWidth;
        setTimeout(() => {
          sliderRef.current!.style.scrollBehavior = "smooth";
          setIsTransitioning(false);
        }, 0);
      }

      setActiveSlide(newActiveSlide);
    }
  };

  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth;
      // Прокручиваем к слайду в центральном наборе элементов
      sliderRef.current.scrollTo({
        left: slideWidth * (index + items.length),
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      // Устанавливаем начальную позицию на центральный набор элементов
      slider.scrollLeft = slider.clientWidth * items.length;
      slider.addEventListener("scroll", handleScroll);
      return () => slider.removeEventListener("scroll", handleScroll);
    }
  }, [items.length]);

  return (
    <div className={styles.sliderContainer}>
      <div
        ref={sliderRef}
        className={classNames(styles.slider, className)}
        onScroll={handleScroll}
      >
        {extendedItems.map((item, index) => (
          <div key={index} className={styles.item}>
            {item}
          </div>
        ))}
      </div>
      <div className={styles.indicators}>
        {items.map((_, index) => (
          <button
            key={index}
            className={classNames(
              styles.indicator,
              index === activeSlide && styles.indicatorActive
            )}
            onClick={() => scrollToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
