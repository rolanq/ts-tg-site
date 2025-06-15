import React from "react";
import styles from "./FourthStep.module.css";
import CloseIcon from "@/app/shared/Icons/CloseIcon";

interface AddedVideoProps {
  video: File;
  setVideo: React.Dispatch<React.SetStateAction<File | null>>;
}

export const AddedVideo = ({ video, setVideo }: AddedVideoProps) => {
  const handleDeleteVideo = () => {
    setVideo(null);
  };

  const isFromTelegram = video.name.startsWith("https");
  const videoSrc = isFromTelegram ? video.name : URL.createObjectURL(video);

  return (
    <div className={styles.addedImageWrapper}>
      <video
        src={videoSrc}
        controls
        className={styles.addedImage}
        height={100}
        width={125}
      />
      <button onClick={handleDeleteVideo} className={styles.closeIcon}>
        <CloseIcon />
      </button>
    </div>
  );
};
