import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as id3 from "id3js/lib/id3";
import { useHistory, useLocation } from "react-router-dom";

import Layout from "../../../components/Layout";
import uploadSchema from "./track-schema";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import JumboText from "../../../components/JumboText";
import DragAndDrop from "../../../components/DragAndDrop";
import Spinner from "../../../components/Spinner";

import { uploadTrack } from "../../../api/tracks-api";
import { getAllGenres } from "../../../api/genre-api";
import { getUserAlbums } from "../../../api/users-api";
import { PUBLIC } from "../../../constants/routes";
import { TRACK_UPLOAD_INFO } from "../../../constants/local-storage";
import {
  loadLocalStorageItems,
  setLocalStorage,
} from "../../../utils/localStorage";
import BackButton from "../../../components/BackButton";

export default function TrackUpload() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [genresState, setGenres] = useState([]);
  const [albumsState, setAlbums] = useState([]);
  const history = useHistory();
  const userState = useSelector((state) => state.user);
  const userId = userState.mongoId;

  useEffect(async () => {
    const { data } = await getAllGenres();
    const genresArr = data.genres.map((genre) => genre.name);
    genresArr.unshift("Select genre");
    setGenres(genresArr);

    const {
      data: { albums },
    } = await getUserAlbums(userId, 0, 100);
    const albumsArr = albums.map((album) => album.title);
    albumsArr.unshift("Select album");
    setAlbums(albumsArr);
  }, []);

  const goBack = () => {
    if (location.state) {
      history.push(location.state.referrer);
    } else {
      history.push(`${PUBLIC.HOME}`);
    }
  };

  const lsInitialValue = loadLocalStorageItems(TRACK_UPLOAD_INFO, {});

  const formik = useFormik({
    initialValues: {
      name: lsInitialValue.name || "",
      artist: lsInitialValue.artist || "",
      album: "",
      genre: lsInitialValue.genre || "",
      track: lsInitialValue.track || "",
    },
    validationSchema: uploadSchema,
    onSubmit: async (uploadState) => {
      setLoading(true);
      try {
        if (!uploadState.track)
          return toast("Choose a track!", { type: "error" });

        const formData = new FormData();
        formData.append("name", uploadState.name);
        formData.append("artist", uploadState.artist);
        formData.append("album", uploadState.album);
        formData.append("genre", uploadState.genre);
        formData.append("track", uploadState.track);

        await uploadTrack(formData);
        setLoading(false);

        // reset form values
        setLocalStorage({}, TRACK_UPLOAD_INFO);
        formik.setValues(
          {
            name: "",
            artist: "",
            genre: "",
            track: "",
          },
          false,
        );

        toast("Track uploaded!", { type: "success" });
        return goBack();
      } catch (error) {
        setLoading(false);
        return toast(error.message, { type: "error" });
      }
    },
  });

  const trackOnChange = async (files) => {
    formik.setFieldValue("track", files[0]);

    // read metadata ID3
    const tags = await id3.fromFile(files[0]);
    if (tags?.title) formik.setFieldValue("name", tags?.title || "", false);
    if (tags?.artist) formik.setFieldValue("artist", tags?.artist || "", false);
    if (tags?.album) formik.setFieldValue("album", tags?.album || "", false);
    if (tags?.genre) formik.setFieldValue("genre", tags?.genre || "", false);
  };

  const handleCreateAlbum = () => {
    const formValues = {
      name: formik.values.name,
      artist: formik.values.artist,
      genre: formik.values.genre,
      track: formik.values.track,
    };
    setLocalStorage(formValues, TRACK_UPLOAD_INFO);
    history.push(PUBLIC.ADD_ALBUM, {
      referrer: location.pathname,
    });
  };

  return (
    <Layout isNegative>
      <div className="row">
        <div className="mb-5 d-flex">
          <JumboText priText="Song upload" cols="11" isNegative />
          {loading && (
            <div className="col d-flex justify-content-end">
              <Spinner isNegative />
            </div>
          )}
        </div>

        <div className="col col-12 col-md-6 mb-5 mb-md-0">
          <DragAndDrop
            handleChange={trackOnChange}
            dropText="Drop the song here..."
          />
        </div>
        <div className="col col-12 col-md-6">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="mb-4 fnt-form-title">Song details</h1>
            <div className="row mb-4">
              <Input
                label="name"
                type="name"
                id="name"
                classNames="col col-12 col-md-7"
                placeholder="Song name"
                isNegative
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                errorMessage={formik.errors.name}
                hasErrorMessage={formik.touched.name}
              />
              <Input
                label="artist"
                type="artist"
                id="artist"
                classNames="col col-12 col-md-5"
                placeholder="Song artist"
                isNegative
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.artist}
                errorMessage={formik.errors.artist}
                hasErrorMessage={formik.touched.artist}
              />
              <Select
                classNames="col-12 col-lg-6"
                label="genre"
                id="genre"
                type="select"
                isNegative
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.genre}
                errorMessage={formik.errors.genre}
                hasErrorMessage={formik.touched.genre}
                options={genresState}
              />

              <div className="col-12 col-lg-6">
                <Select
                  classNames="me-1 w-100 "
                  label="album"
                  id="album"
                  type="select"
                  hasAddIcon
                  isNegative
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  handleAddIcon={handleCreateAlbum}
                  value={formik.values.album}
                  errorMessage={formik.errors.album}
                  hasErrorMessage={formik.touched.album}
                  options={albumsState}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end buttons-wrapper col col-12 p-0">
              <BackButton classNames="me-3" isNegative secondaryBtn />
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
