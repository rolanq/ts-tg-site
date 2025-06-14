"use client";
import { COLORS } from "@/app/shared/constants/colors";
import Image from "next/image";
import styles from "./ImageContainer.module.css";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";

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
  return (
    <div
      className={styles.imageContainer}
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
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
          }}
          unoptimized
          priority
          className={className}
        />
      ) : (
        <CustomTyphography color="gray">Без фото</CustomTyphography>
      )}
    </div>
  );
};
