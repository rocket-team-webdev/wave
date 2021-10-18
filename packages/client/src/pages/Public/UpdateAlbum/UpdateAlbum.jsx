import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useHistory, useRouteMatch } from "react-router-dom";

import Layout from "../../../components/Layout";
import updateAlbumSchema from "./update-album-schema";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import DragAndDrop from "../../../components/DragAndDrop";
import JumboText from "../../../components/JumboText";
import Spinner from "../../../components/Spinner";

import { getAlbumById, updateAlbum } from "../../../api/album-api";
import { PUBLIC } from "../../../constants/routes";
import BackButton from "../../../components/BackButton";

export default function UpdateAlbum() {
  const history = useHistory();
  const { albumId } = useRouteMatch(`${PUBLIC.UPDATE_ALBUM}/:albumId`).params;
  const [album, setAlbum] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      title: "",
      year: "",
      thumbnail: "",
    },
    validationSchema: updateAlbumSchema,
    onSubmit: async (albumState) => {
      try {
        const formData = new FormData();
        formData.append("title", albumState.title);
        formData.append("year", albumState.year);
        formData.append("thumbnail", albumState.thumbnail);
        formData.append("id", albumId);

        await updateAlbum(formData);
        history.push(`${PUBLIC.ALBUM}/${album._id}`);
        return toast("Album updated!", { type: "success" });
      } catch (error) {
        return toast(error.response.data.msg, { type: "error" });
      }
    },
  });

  async function fetchAlbum(id) {
    setIsLoading(true);
    try {
      const { data } = await getAlbumById(id);
      formik.setValues({
        title: data.data.title,
        year: data.data.year,
      });
      setAlbum(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  useEffect(() => {
    fetchAlbum(albumId);
    setIsLoading(false);
  }, []);

  const thumbnailOnChange = async (files) => {
    formik.setFieldValue("thumbnail", files[0]);
  };

  return (
    <Layout isNegative>
      <div className="row">
        <div className="mb-5 d-flex">
          <JumboText priText={album.title} cols="12" isNegative />
          {isLoading && (
            <div className="col d-flex justify-content-end">
              <Spinner isNegative />
            </div>
          )}
        </div>

        <div className="col col-12 col-md-6">
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
                  <strong>Note:</strong> Drop the new cover if you want to
                  update it.
                </p>
              </div>
              <div className="d-flex justify-content-end buttons-wrapper col col-12 col-md-6 p-0">
                {/* <Button
                  classNames="me-3"
                  isNegative
                  secondaryBtn
                  handleClick={() => history.goBack()}
                >
                  Back
                </Button> */}
                <BackButton classNames="me-3" isNegative secondaryBtn />
                <Button isNegative submitButton>
                  Update
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
