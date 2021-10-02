import React, { useMemo, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import Input from "../Input";
import AddIcon from "../SVGicons/AddIcon";

import "./DragAndDrop.scss";

export default function DragAndDrop({
  handleChange,
  dropText,
  acceptFiles = "audio/*",
}) {
  const [files, setFiles] = useState(dropText);

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    paddingBottom: "40px",
    // marginRight: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "rgba(250, 250, 250, 0.2)",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
    backgroundColor: "#c6f18850",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
    backgroundColor: "#f1889250",
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      handleChange(acceptedFiles);
      setFiles(acceptedFiles[0].name);
      return toast("File uploaded!", { type: "success" });
    }

    return toast("File format not supported", { type: "error" });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: acceptFiles, maFiles: 1 });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="d-flex flex-column align-items-center pt-4 m-auto">
          <AddIcon color="white" size={150} />
          <Input
            classNames="col-12 col-md-6"
            label=""
            id="thumbnail"
            type="file"
            placeholder="Upload file"
            isNegative
          />
          <p className="pt-3 fnt-white">{files}</p>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center pt-4 m-auto">
          <AddIcon color="white" size={150} />
          <Input
            classNames="col-12 col-md-6"
            label=""
            id="thumbnail"
            type="file"
            placeholder="Upload file"
            isNegative
          />
          <p className="pt-3 fnt-white">{files}</p>
        </div>
      )}
    </div>
  );
}
