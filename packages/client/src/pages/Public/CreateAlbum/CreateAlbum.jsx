import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";

import Layout from "../../../components/Layout";
import albumSchema from "./album-schema";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import DragAndDrop from "../../../components/DragAndDrop";
import JumboText from "../../../components/JumboText";
import Spinner from "../../../components/Spinner";

import { addAlbum } from "../../../api/album-api";
import BackButton from "../../../components/BackButton";
import { PUBLIC } from "../../../constants/routes";

export default function CreateAlbum() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      title: "",
      year: "",
      thumbnail: "",
    },
    validationSchema: albumSchema,
    onSubmit: async (albumState) => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("title", albumState.title);
        formData.append("year", albumState.year);
        formData.append("thumbnail", albumState.thumbnail);
        await addAlbum(formData);
        if (location.state) {
          history.push(location.state.referrer);
        } else {
          history.push(`${PUBLIC.TRACK_UPLOAD}`);
        }
        setIsLoading(false);
        return toast("Album created!", { type: "success" });
      } catch (error) {
        setIsLoading(false);
        return toast(error.response.data.msg, { type: "error" });
      }
    },
  });

  const thumbnailOnChange = async (files) => {
    formik.setFieldValue("thumbnail", files[0]);
  };

  return (
    <Layout docTitle="New album" isNegative>
      <div className="row">
        <div className="mb-5 d-flex">
          <JumboText priText="New album" cols="12" isNegative />
          {isLoading && (
            <div className="col d-flex justify-content-end">
              <Spinner isNegative />
            </div>
          )}
        </div>

        <div className="col col-12 col-md-6 mb-5 mb-md-0">
          <DragAndDrop
            acceptFiles="image/*"
            handleChange={thumbnailOnChange}
            dropText="Drop the cover here..."
          />
        </div>

        <div className="row col col-12 col-md-6">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="fnt-form-title mb-5">Album details</h1>
            <div className="row">
              <Input
                label="title"
                type="text"
                id="title"
                classNames="col col-12 col-md-7"
                placeholder="Album title"
                isNegative
                maxLength="30"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                errorMessage={formik.errors.title}
                hasErrorMessage={formik.touched.title}
              />
              <Input
                label="Release year"
                type="number"
                id="year"
                classNames="col col-12 col-md-5"
                placeholder="Album year"
                isNegative
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.year}
                errorMessage={formik.errors.year}
                hasErrorMessage={formik.touched.year}
              />
            </div>
            <div className="footer-wrapper d-flex justify-content-between align-items-center row p-0 m-0">
              <div className="footer-left col-12 col-md-6 ps-0">
                <p className="fnt-smallest col col-12 col-md-11 p-0 mt-2 truncate ">
                  <strong>Note:</strong> Don&apos;t forget to upload the cover
                  file.
                </p>
              </div>
              <div className="d-flex justify-content-end buttons-wrapper col col-12 col-md-6 p-0">
                <BackButton isNegative secondaryBtn classNames="me-3" />
                <Button isNegative submitButton disabled={isLoading}>
                  Create
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
