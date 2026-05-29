import { useState, useCallback } from "react";
import { CLOUDINARY_KEY, CLOUDINARY_PRESET_KEY } from "../components/ui/CloudinarySetup.jsx";

/**
 * useCloudinary — upload vers Cloudinary via unsigned preset
 * Cloud name + preset lus depuis localStorage (configurés via CloudinarySetup)
 */
export function useCloudinary() {
  const [uploading, setUploading] = useState(false);
  const [progress,  setProgress]  = useState(0);

  const upload = useCallback(async (file) => {
    const cloudName = localStorage.getItem(CLOUDINARY_KEY);
    const preset    = localStorage.getItem(CLOUDINARY_PRESET_KEY);

    if (!cloudName || !preset) {
      throw new Error("CLOUDINARY_NOT_CONFIGURED");
    }

    setUploading(true);
    setProgress(0);

    try {
      const compressed = await compressImage(file, 1200, 0.82);

      const formData = new FormData();
      formData.append("file",          compressed);
      formData.append("upload_preset", preset);
      formData.append("folder",        "couple-app");

      const result = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
        };
        xhr.onload  = () => xhr.status === 200
          ? resolve(JSON.parse(xhr.responseText))
          : reject(new Error(`Cloudinary error ${xhr.status}`));
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(formData);
      });

      setProgress(100);

      return {
        cloudinaryId: result.public_id,
        url:          result.secure_url,
        thumbUrl:     result.secure_url.replace(
          "/upload/",
          "/upload/w_400,c_fill,q_auto,f_auto/"
        ),
        width:  result.width,
        height: result.height,
      };
    } finally {
      setUploading(false);
    }
  }, []);

  return { upload, uploading, progress };
}

// ─── Compression canvas ───────────────────────────────────────
async function compressImage(file, maxSize = 1200, quality = 0.82) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;

      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = Math.round((height * maxSize) / width);
          width  = maxSize;
        } else {
          width  = Math.round((width * maxSize) / height);
          height = maxSize;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width  = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => resolve(new File([blob], file.name, { type: "image/jpeg" })),
        "image/jpeg",
        quality
      );
    };
    img.src = url;
  });
}

export default useCloudinary;