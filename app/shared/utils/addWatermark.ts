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
      const maxSize = 10 * 1024 * 1024; // 10 МБ в байтах

      canvas.toBlob((blob) => {
        if (blob) {
          if (blob.size > maxSize) {
            // Сжимаем изображение если оно больше 10 МБ
            const compressionCanvas = document.createElement("canvas");
            const compressionCtx = compressionCanvas.getContext("2d")!;

            let scale = 1;
            const targetSize = maxSize;

            // Вычисляем масштаб для сжатия
            while (blob.size > targetSize && scale > 0.1) {
              scale -= 0.1;
              compressionCanvas.width = canvas.width * scale;
              compressionCanvas.height = canvas.height * scale;

              compressionCtx.drawImage(
                canvas,
                0,
                0,
                compressionCanvas.width,
                compressionCanvas.height
              );

              compressionCanvas.toBlob(
                (compressedBlob) => {
                  if (compressedBlob && compressedBlob.size <= targetSize) {
                    resolve(compressedBlob);
                  }
                },
                "image/jpeg",
                0.8
              );
            }

            // Если сжатие не помогло, возвращаем исходный blob
            resolve(blob);
          } else {
            resolve(blob);
          }
        } else {
          reject(new Error("Не удалось создать водяной знак"));
        }
      }, "image/png");
    };

    img.onerror = () => reject(new Error("Ошибка загрузки изображения"));
    img.src = url;
  });
};

export const supressPhoto = async (image: File | Blob): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(image);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const maxSize = 10 * 1024 * 1024; // 10 МБ в байтах

      canvas.toBlob(
        (blob) => {
          if (blob) {
            if (blob.size > maxSize) {
              // Сжимаем изображение если оно больше 10 МБ
              const compressionCanvas = document.createElement("canvas");
              const compressionCtx = compressionCanvas.getContext("2d")!;

              let scale = 1;
              const targetSize = maxSize;

              // Вычисляем масштаб для сжатия
              while (blob.size > targetSize && scale > 0.1) {
                scale -= 0.1;
                compressionCanvas.width = canvas.width * scale;
                compressionCanvas.height = canvas.height * scale;

                compressionCtx.drawImage(
                  canvas,
                  0,
                  0,
                  compressionCanvas.width,
                  compressionCanvas.height
                );

                compressionCanvas.toBlob(
                  (compressedBlob) => {
                    if (compressedBlob && compressedBlob.size <= targetSize) {
                      URL.revokeObjectURL(url); // Очищаем URL
                      resolve(compressedBlob);
                    }
                  },
                  "image/jpeg",
                  0.8
                );
              }

              // Если сжатие не помогло, возвращаем исходный blob
              URL.revokeObjectURL(url);
              resolve(blob);
            } else {
              URL.revokeObjectURL(url);
              resolve(blob);
            }
          } else {
            URL.revokeObjectURL(url);
            reject(new Error("Не удалось сжать изображение"));
          }
        },
        "image/jpeg",
        0.9
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Ошибка загрузки изображения"));
    };
    img.src = url;
  });
};
