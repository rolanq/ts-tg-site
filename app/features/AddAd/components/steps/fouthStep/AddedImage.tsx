import React from "react";
import styles from "./FourthStep.module.css";

interface AddedImageProps {
  photo: File;
  index: number;
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
}

export const AddedImage = ({ photo, index, setPhotos }: AddedImageProps) => {
  const handleDeletePhoto = () => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <img
      src={URL.createObjectURL(photo)}
      alt="photo"
      key={index}
      className={styles.addedImage}
      onClick={handleDeletePhoto}
    />
  );
};
