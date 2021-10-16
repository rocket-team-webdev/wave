import React, { useEffect, useRef, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import Layout from "../../../components/Layout";
import playlistUpdateSchema from "./playlist-update-schema";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import JumboText from "../../../components/JumboText";
import Textarea from "../../../components/Textarea";
import Checkbox from "../../../components/Checkbox";
import Spinner from "../../../components/Spinner";
import DragAndDrop from "../../../components/DragAndDrop";

import { PUBLIC } from "../../../constants/routes";
import {
  getPlaylistById,
  updatePlaylistById,
} from "../../../api/playlists-api";

export default function PlaylistUpdate() {
  const { playlistId } = useRouteMatch(
    `${PUBLIC.PLAYLIST_UPDATE}/:playlistId`,
  ).params;

  const [publicAccessible, setPublicAccessible] = useState(false);
  const [playlistState, setPlaylistState] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const publicAccessibleCheckbox = useRef();

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      thumbnail: "",
      primaryColor: "#000000",
      publicAccessible: false,
    },
    validationSchema: playlistUpdateSchema,
    onSubmit: async (playlist) => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", playlist.name);
        formData.append("description", playlist.description);
        formData.append("primaryColor", playlist.primaryColor);
        formData.append("publicAccessible", playlist.publicAccessible);
        formData.append("thumbnail", playlist.thumbnail);
        formData.append("id", playlistId);

        await updatePlaylistById(formData);
        history.push(`${PUBLIC.SINGLE_PLAYLIST}/${playlistId}`);
        return toast("Playlist updated!", { type: "success" });
      } catch (error) {
        return toast(error.response.data.msg, { type: "error" });
      }
    },
  });

  async function fetchPlaylist(id) {
    setIsLoading(true);
    try {
      const { data } = await getPlaylistById(id);
      formik.setValues({
        name: data.data.name,
        description: data.data.description,
        primaryColor: data.data.primaryColor,
        publicAccessible: data.data.publicAccessible,
      });
      setPlaylistState(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  const initialPublicAccessible = () => {
    setPublicAccessible(playlistState.publicAccessible);
  };

  const handlePublicAccessible = () => {
    const { checked } = publicAccessibleCheckbox.current;
    setPublicAccessible(checked);
    formik.setFieldValue("publicAccessible", checked);
  };

  useEffect(() => {
    fetchPlaylist(playlistId);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    initialPublicAccessible();
  }, [playlistState]);

  const thumbnailOnChange = async (files) => {
    formik.setFieldValue("thumbnail", files[0]);
  };

  return (
    <Layout isNegative>
      <div className="row">
        <div className="mb-5 d-flex">
          <JumboText priText={playlistState.name} cols="12" isNegative />
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
            <h1 className="fnt-form-title mb-5">Playlist details</h1>
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
                    ref={publicAccessibleCheckbox}
                    checked={publicAccessible}
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
