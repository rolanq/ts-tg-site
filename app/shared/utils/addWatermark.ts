const watermarkText = process.env.NEXT_PUBLIC_BOT_TITLE!;

export const addWatermark = async (image: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(image);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const fontSize = Math.floor(Math.min(canvas.width, canvas.height) / 8);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 4);

      ctx.font = `${fontSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fillText(watermarkText, 0, 0);

      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.lineWidth = 2;
      ctx.strokeText(watermarkText, 0, 0);

      ctx.restore();

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Не удалось создать водяной знак"));
        }
      }, "image/png");
    };

    img.onerror = () => reject(new Error("Ошибка загрузки изображения"));
    img.src = url;
  });
};
