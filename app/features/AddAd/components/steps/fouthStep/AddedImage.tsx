import React from "react";
import styles from "./FourthStep.module.css";
import Image from "next/image";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import CloseIcon from "@/app/shared/Icons/CloseIcon";

interface AddedImageProps {
  photo: File;
  index: number;
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
}

export const AddedImage = ({ photo, index, setPhotos }: AddedImageProps) => {
  const handleDeletePhoto = () => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const isFromTelegram = photo.name.startsWith("https");

  return (
    <div className={styles.addedImageWrapper}>
      <Image
        src={isFromTelegram ? photo.name : URL.createObjectURL(photo)}
        alt="photo"
        key={index}
        className={styles.addedImage}
        unoptimized
        height={100}
        width={125}
      />
      <button onClick={handleDeletePhoto} className={styles.closeIcon}>
        <CloseIcon />
      </button>
    </div>
  );
};
