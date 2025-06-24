"use client";
import { COLORS } from "@/app/shared/constants/colors";
import Image from "next/image";
import styles from "./ImageContainer.module.css";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { createPortal } from "react-dom";
import CloseIcon from "@/app/shared/Icons/CloseIcon";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";

interface ImageContainerProps {
  image?: string;
  className?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export const ImageContainer = ({
  image,
  className,
  width = 100,
  height = 100,
  borderRadius = 12,
}: ImageContainerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleImageClick = () => {
    if (image) {
      setIsFullscreen(true);
    }
  };

  const closeFullscreen = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsFullscreen(false);
    }
  };

  const handleCloseButtonClick = () => {
    setIsFullscreen(false);
  };

  const renderFullscreenContent = () => (
    <div className={styles.fullscreenOverlay} onClick={closeFullscreen}>
      <CustomButton
        className={styles.closeButton}
        onClick={handleCloseButtonClick}
        stretched
        align="center"
        isText={false}
      >
        <CloseIcon />
      </CustomButton>
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={8}
        centerOnInit={true}
        wheel={{ disabled: false }}
        doubleClick={{ disabled: false }}
        panning={{ disabled: false }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent
              wrapperClass={styles.fullscreenContent}
              contentClass={styles.imageWrapper}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={image || ""}
                  alt="Fullscreen Image"
                  fill
                  sizes="90vw"
                  priority
                  style={{
                    objectFit: "contain",
                  }}
                  quality={100}
                  draggable={false}
                />
              </div>
            </TransformComponent>
            <div
              className={styles.zoomControls}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomOut();
                }}
              >
                -
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetTransform();
                }}
              >
                Сбросить
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomIn();
                }}
              >
                +
              </button>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );

  return (
    <>
      <div
        className={styles.imageContainer}
        style={{
          height: `${height}px`,
          width: `${width}px`,
        }}
        onClick={handleImageClick}
      >
        {image ? (
          <Image
            src={image}
            alt="Image"
            width={width}
            height={height}
            style={{
              borderRadius: `${borderRadius}px`,
              objectFit: "cover",
              overflow: "hidden",
              height: `${height}px`,
              width: `${width}px`,
              cursor: "pointer",
            }}
            loading="lazy"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPjA+OjU/RUVHUFBQUFtbW1tbW1tbW1tbW1v/2wBDARUXFyAeIB4gHR4eHiAiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            className={className}
          />
        ) : (
          <CustomTyphography color="gray">Без фото</CustomTyphography>
        )}
      </div>

      {isFullscreen &&
        typeof document !== "undefined" &&
        createPortal(renderFullscreenContent(), document.body)}
    </>
  );
};
