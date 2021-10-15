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
import { addPlaylist, addTrackToPlaylist } from "../../../api/playlists-api";
import { PUBLIC } from "../../../constants/routes";

export default function CreatePlaylist() {
  const history = useHistory();
  const [publicAccessible, setPublicAccessible] = useState(false);
  const publicAccessibleCheckbox = useRef();

  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      thumbnail: "",
      primaryColor: "#000000",
      publicAccessible: false,
    },
    validationSchema: playlistSchema,
    onSubmit: async (playlistState) => {
      try {
        const formData = new FormData();
        formData.append("name", playlistState.name);
        formData.append("primaryColor", playlistState.primaryColor);
        formData.append("description", playlistState.description);
        formData.append("publicAccessible", playlistState.publicAccessible);
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
    setPublicAccessible(checked);
    formik.setFieldValue("publicAccessible", checked);
  };

  return (
    <Layout isNegative>
      <div className="row">
        <div className="mb-5">
          <JumboText priText="New playlist" cols="12" isNegative />
        </div>
        {/* //TODO THUMBNAIL */}
        <div className="col col-12 col-md-6">
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
              <div className="col col-12 col-md-8">
                <Checkbox
                  label="Private"
                  id="publicAccessible"
                  ref={publicAccessibleCheckbox}
                  checked={publicAccessible}
                  onChange={handlePublicAccessible}
                />
                <p className="fnt-smallest mt-2 m-0">
                  <strong>Note:</strong> Don&apos;t forget to upload the cover
                  file.
                </p>
              </div>
              <div className="d-flex justify-content-between buttons-wrapper col col-12 col-md-4">
                <Button
                  isNegative
                  secondaryBtn
                  handleClick={() => history.goBack()}
                >
                  Back
                </Button>
                <Button isNegative submitButton>
                  Add
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
