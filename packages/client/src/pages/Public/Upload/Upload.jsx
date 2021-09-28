import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import Layout from "../../../components/Layout";
import uploadSchema from "./upload-in-schema";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import DragAndDrop from "../../../components/DragAndDrop";
import { uploadCover } from "../../../api/example";

export default function Home() {
  const [filesState, setFilesState] = useState([]);

  const handleDrop = (files) => {
    Object.values(files).forEach((file) => {
      setFilesState((prevState) => [...prevState, file.name]);
    });
  };

  // const fileOnChange = async (event) => {
  //   const file = event.target.files[0];
  //   const fd = new FormData();
  //   fd.append("file", file);
  //   await uploadCover(fd);
  //   console.log("SE SUBIOOO");
  // };

  const formik = useFormik({
    initialValues: {
      title: "",
      artist: "",
      album: "",
      genre: "",
      thumbnail: "",
      track: "",
    },
    validationSchema: uploadSchema,
    onSubmit: async (signInState) => {
      try {
        const formData = new FormData();
        formData.append("title", signInState.title);
        formData.append("artist", signInState.artist);
        formData.append("album", signInState.album);
        formData.append("genre", signInState.genre);
        formData.append("thumbnail", signInState.thumbnail);
        formData.append("track", signInState.track);

        console.log("formData", formData);
        await uploadCover(formData);
        console.log("SE SUBIOOO");
      } catch (error) {
        toast(error.message, { type: "error" });
      }
    },
  });

  const thumbnailOnChange = async (event) => {
    formik.setFieldValue("thumbnail", event.target.files[0]);
  };

  const trackOnChange = async (event) => {
    formik.setFieldValue("track", event.target.files[0]);
  };

  return (
    <Layout isNegative>
      <div className="row ">
        <div className="col col-12 col-md-6 p-4">
          <p className="fnt-sidebar fnt-light">Upload your song</p>

          <DragAndDrop handleDropEvent={handleDrop}>
            <Input
              classNames="col-12 col-md-6"
              label=""
              id="thumbnail"
              type="file"
              placeholder="Upload file"
              isNegative
              onChange={trackOnChange}
              onBlur={trackOnChange}
              // value={formik.values.genre}
              // errorMessage={formik.errors.genre}
              // hasErrorMessage={formik.touched.genre}
            />

            <div>
              {filesState.map((file) => (
                <div key={file}>{file}</div>
              ))}
            </div>
          </DragAndDrop>
        </div>

        <div className="col col-12 col-md-6 mt-10 px-5">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="fnt-subtitle-bold mb-4">Song details</h1>
            <div className="row">
              <Input
                label="title"
                type="title"
                id="title"
                classNames="col-12"
                placeholder="example: "
                isNegative
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                errorMessage={formik.errors.title}
                hasErrorMessage={formik.touched.title}
              />
              <Input
                label="artist"
                type="artist"
                id="artist"
                classNames="col-6"
                placeholder=""
                isNegative
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.artist}
                errorMessage={formik.errors.artist}
                hasErrorMessage={formik.touched.artist}
              />
              <Select
                classNames="col-12 col-md-6"
                label="album"
                id="album"
                type="select"
                isNegative
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.album}
                errorMessage={formik.errors.album}
                hasErrorMessage={formik.touched.album}
                options={["", "Album 1", "Album 2"]}
              />
              <Select
                classNames="col-12 col-md-6"
                label="genre"
                id="genre"
                type="select"
                isNegative
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.genre}
                errorMessage={formik.errors.genre}
                hasErrorMessage={formik.touched.genre}
                options={["", "rock", "jazz"]}
              />

              <Input
                classNames="col-12 col-md-6"
                label="thumbnail"
                id="thumbnail"
                type="file"
                placeholder="Upload file"
                isNegative
                onChange={thumbnailOnChange}
                onBlur={thumbnailOnChange}
                // value={formik.values.thumbnail}
                errorMessage={formik.errors.thumbnail}
                hasErrorMessage={formik.touched.thumbnail}
              />
            </div>

            <div className="d-flex justify-content-end my-5">
              <Button isNegative submitButton>
                Upload
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
