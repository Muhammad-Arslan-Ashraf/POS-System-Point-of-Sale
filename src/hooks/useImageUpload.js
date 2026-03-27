// hooks/useImageUpload.js
import { useRef, useState, useEffect } from "react";

// ─── Helper — image compress karo before save ─────────────
const compressImage = (file) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Max 400px width — product card ke liye kaafi hai
      const MAX = 400;
      const ratio = Math.min(MAX / img.width, MAX / img.height, 1);

      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 0.7 quality — size kam, quality achhi
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };

    img.src = URL.createObjectURL(file);
  });
};

// ─── Hook ────────────────────────────────────────────────
const useImageUpload = () => {
  const [preview, setPreview] = useState(null); // blob — fast display
  const [base64, setBase64] = useState(null); // compressed — save ke liye

  const fileInputRef = useRef(null);

  // Memory leak fix
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Turant preview dikhao — user ko wait na karna pade
    setPreview(URL.createObjectURL(file));

    // Background mein compress karo
    const compressed = await compressImage(file);
    setBase64(compressed);
  };

  const handleRemove = () => {
    setPreview(null);
    setBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openFilePicker = () => fileInputRef.current?.click();

  return {
    preview,
    base64,
    fileInputRef,
    handleFileChange,
    handleRemove,
    openFilePicker,
  };
};

export default useImageUpload;
