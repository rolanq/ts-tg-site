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
  );
};
