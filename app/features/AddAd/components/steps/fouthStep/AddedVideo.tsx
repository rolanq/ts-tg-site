import React, { useEffect, useState } from "react";
import styles from "./FourthStep.module.css";
import Image from "next/image";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import CloseIcon from "@/app/shared/Icons/CloseIcon";

interface AddedVideoProps {
  video: File;
  setVideo: React.Dispatch<React.SetStateAction<File | null>>;
}

export const AddedVideo = ({ video, setVideo }: AddedVideoProps) => {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleDeleteVideo = () => {
    setVideo(null);
  };

  useEffect(() => {
    if (!video) {
      setVideoPreview(null);
      return;
    }
    const url = URL.createObjectURL(video);
    const videoElement = document.createElement("video");
    videoElement.src = url;
    videoElement.crossOrigin = "anonymous";
    videoElement.muted = true;
    videoElement.currentTime = 0.1; // чуть дальше старта, чтобы точно был кадр
    videoElement.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        setVideoPreview(canvas.toDataURL("image/png"));
      }
      URL.revokeObjectURL(url);
    });

    return () => {
      setVideoPreview(null);
      URL.revokeObjectURL(url);
    };
  }, [video]);

  if (!videoPreview) return null;

  return (
    <div className={styles.addedImageWrapper}>
      <Image
        src={videoPreview}
        alt="video"
        key={video.name}
        className={styles.addedImage}
        unoptimized
        height={100}
        width={125}
      />
      <button onClick={handleDeleteVideo} className={styles.closeIcon}>
        <CloseIcon />
      </button>
    </div>
  );
};
