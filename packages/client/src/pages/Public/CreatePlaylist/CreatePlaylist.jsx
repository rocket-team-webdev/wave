import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";

import Layout from "../../../components/Layout";
import playlistSchema from "./playlist-schema";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import DragAndDrop from "../../../components/DragAndDrop";
import JumboText from "../../../components/JumboText";
import Textarea from "../../../components/Textarea";
import Checkbox from "../../../components/Checkbox";
import Spinner from "../../../components/Spinner";

import { addPlaylist, addTrackToPlaylist } from "../../../api/playlists-api";
import { PUBLIC } from "../../../constants/routes";

export default function CreatePlaylist() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [publicAccessible, setPublicAccessible] = useState(true);
  const publicAccessibleCheckbox = useRef();

  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      thumbnail: "",
      primaryColor: "#000000",
      publicAccessible: true,
    },
    validationSchema: playlistSchema,
    enableReinitialize: true,
    onSubmit: async (playlistState) => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", playlistState.name);
        formData.append("primaryColor", playlistState.primaryColor);
        formData.append("description", playlistState.description);
        formData.append("publicAccessible", publicAccessible);
        formData.append("thumbnail", playlistState.thumbnail);

        const newPlaylist = await addPlaylist(formData);
        if (location.state?.trackId) {
          const { trackId } = location.state;
          try {
            await addTrackToPlaylist(newPlaylist.data.playlistId, trackId);
            history.push(
              `${PUBLIC.SINGLE_PLAYLIST}/${newPlaylist.data.playlistId}`,
            );
            return toast("Playlist created and track added!", {
              type: "success",
            });
          } catch (e) {
            return toast(e.response.data.msg, { type: "error" });
          }
        }
        history.goBack();
        return toast("Playlist created!", { type: "success" });
      } catch (error) {
        return toast(error.response?.data.msg, { type: "error" });
      }
    },
  });

  const thumbnailOnChange = async (files) => {
    formik.setFieldValue("thumbnail", files[0]);
  };

  const handlePublicAccessible = () => {
    const { checked } = publicAccessibleCheckbox.current;
    setPublicAccessible(!checked);
    // formik.setFieldValue("publicAccessible", !publicAccessible);
    formik.values.publicAccessible = !checked;
  };

  return (
    <Layout isNegative>
      <div className="row">
        <div className="mb-5 d-flex">
          <JumboText priText="New playlist" cols="12" isNegative />
          {isLoading && (
            <div className="col d-flex justify-content-end">
              <Spinner isNegative />
            </div>
          )}
        </div>
        <div className="col col-12 col-md-6 mb-5 mb-md-0">
          <DragAndDrop
            paddingBottom="65px"
            paddingTop="65px"
            acceptFiles="image/*"
            handleChange={thumbnailOnChange}
            dropText="Drop the cover here..."
          />
        </div>

        <div className="row col col-12 col-md-6">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="fnt-form-title mb-4">Playlist details</h1>
            <div className="row">
              <Input
                label="name"
                type="text"
                id="name"
                classNames="col col-12 col-md-8"
                placeholder="Playlist name"
                isNegative
                maxLength="30"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                errorMessage={formik.errors.name}
                hasErrorMessage={formik.touched.name}
              />
              <Input
                label="color"
                type="color"
                id="primaryColor"
                classNames="col col-12 col-md-4"
                placeholder="Playlist name"
                isNegative
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.primaryColor}
                errorMessage={formik.errors.primaryColor}
                hasErrorMessage={formik.touched.primaryColor}
              />
              <Textarea
                label="description"
                id="description"
                classNames="col-12"
                rows={4}
                placeholder="Playlist description"
                isNegative
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                errorMessage={formik.errors.description}
                hasErrorMessage={formik.touched.description}
              />
              <div className="footer-wrapper d-flex justify-content-between align-items-center row p-0 m-0">
                <div className="footer-left col-12 col-md-6">
                  <Checkbox
                    label="Private"
                    id="publicAccessible"
                    name="publicAccessible"
                    ref={publicAccessibleCheckbox}
                    checked={!publicAccessible}
                    onChange={handlePublicAccessible}
                  />
                  <p className="fnt-smallest col col-12 col-md-11 p-0 mt-2 truncate">
                    <strong>Note:</strong> Don&apos;t forget to upload the cover
                    file.
                  </p>
                </div>
                <div className="d-flex justify-content-end buttons-wrapper col col-12 col-md-6 p-0">
                  <Button
                    classNames="me-3"
                    isNegative
                    secondaryBtn
                    handleClick={() => history.goBack()}
                  >
                    Back
                  </Button>
                  <Button isNegative submitButton>
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
