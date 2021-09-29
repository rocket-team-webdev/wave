import React, { useState } from "react";

export default function Upload() {
  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  // const [selectedFile, setSelectedFile] = useState("");

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  return (
    <div>
      <form onSubmit={handleSubmitFile}>
        <input
          type="file"
          onChange={handleFileInputChange}
          value={fileInputState}
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
}
