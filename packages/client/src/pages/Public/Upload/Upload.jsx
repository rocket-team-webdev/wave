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

  const fileOnChange = async (event) => {
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append("file", file);
    await uploadCover(fd);
    console.log("SE SUBIOOO");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: uploadSchema,
    onSubmit: async (signInState) => {
      try {
        console.log("signInState", signInState);
        await uploadCover();
        console.log("SE HIZOOO");
      } catch (error) {
        toast(error.message, { type: "error" });
      }
    },
  });

  return (
    <Layout>
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.genre}
              errorMessage={formik.errors.genre}
              hasErrorMessage={formik.touched.genre}
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
                options={["Album1", "Album2", "Album3"]}
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
                options={["Genre1", "Genre2", "Genre3"]}
              />
              <Input
                classNames="col-12 col-md-6"
                label="thumbnail"
                id="thumbnail"
                type="file"
                placeholder="Upload file"
                isNegative
                onChange={fileOnChange}
                onBlur={fileOnChange}
                // value={formik.values.genre}
                // errorMessage={formik.errors.genre}
                // hasErrorMessage={formik.touched.genre}
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
