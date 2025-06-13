"use client";
import { COLORS } from "@/app/shared/constants/colors";
import Image from "next/image";
import styles from "./ImageContainer.module.css";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";

export const ImageContainer = ({ image }: { image?: string }) => {
  return (
    <div className={styles.imageContainer}>
      {image ? (
        <Image
          src={image}
          alt="Image"
          width={100}
          height={100}
          style={{
            borderRadius: "12px",
            objectFit: "cover",
            overflow: "hidden",
            height: "100px",
            width: "100px",
          }}
          unoptimized
          priority
        />
      ) : (
        <CustomTyphography color="gray">Без фото</CustomTyphography>
      )}
    </div>
  );
};
