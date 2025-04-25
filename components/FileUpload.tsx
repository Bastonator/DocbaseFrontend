"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ Token }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUpload, setisupload] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleUpload(acceptedFiles[0]);
    }
    // Do something with the files
  }, []);

  const handleUpload = async (file: File) => {
    const token = Token;

    setisupload(true);

    if (!token) {
      console.error("No access token for user");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/api/auth/upload/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }
      const data = await response.json();
      setUploadedFile(data);
      console.log("Upload success:", data);
      window.location.reload();
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setisupload(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: { "image/*": [".jpeg", ".png", ".jpg", ".pdf"] },
  });

  return (
    <div {...getRootProps()} className={"cursor-pointer"}>
      <input {...getInputProps()} />
      <button
        type={"button"}
        className={"uploader-button text-white"}
        disabled={isUpload}
      >
        Upload
      </button>
    </div>
  );
};
export default FileUpload;
