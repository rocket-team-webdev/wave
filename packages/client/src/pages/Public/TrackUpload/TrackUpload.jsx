import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
// import * as id3 from "id3js/lib/id3";
import { useHistory } from "react-router-dom";

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
import { getUserAlbum } from "../../../api/album-api";
import { PUBLIC } from "../../../constants/routes";
import { TRACK_UPLOAD_INFO } from "../../../constants/local-storage";
import {
  loadLocalStorageItems,
  setLocalStorage,
} from "../../../utils/localStorage";

export default function TrackUpload() {
  const [loading, setLoading] = useState(false);
  const [genresState, setGenres] = useState([]);
  const [albumsState, setAlbums] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    const { data } = await getAllGenres();
    const {
      data: { albums },
    } = await getUserAlbum();

    if (data.genres) {
      const genresArr = data.genres.map((genre) => genre.name);
      genresArr.unshift("Select genre");
      setGenres(genresArr);
    }
    if (albums) {
      const albumsArr = albums.map((album) => album.title);
      albumsArr.unshift("Select album");
      setAlbums(albumsArr);
    }
  }, []);

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
      try {
        if (!uploadState.track)
          return toast("Choose a track!", { type: "error" });

        const formData = new FormData();
        formData.append("name", uploadState.name);
        formData.append("artist", uploadState.artist);
        formData.append("album", uploadState.album);
        formData.append("genre", uploadState.genre);
        formData.append("track", uploadState.track);

        setLoading(true);
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

        return toast("Track uploaded!", { type: "success" });
      } catch (error) {
        setLoading(false);
        return toast(error.message, { type: "error" });
      }
    },
  });

  const trackOnChange = async (files) => {
    formik.setFieldValue("track", files[0]);

    // read metadata ID3
    // const tags = await id3.fromFile(files[0]);
    // if (tags?.title) formik.setFieldValue("name", tags?.title || "", false);
    // if (tags?.artist) formik.setFieldValue("artist", tags?.artist || "", false);
    // if (tags?.album) formik.setFieldValue("album", tags?.album || "", false);
    // if (tags?.genre) formik.setFieldValue("genre", tags?.genre || "", false);
  };

  const handleCreateAlbum = () => {
    const formValues = {
      name: formik.values.name,
      artist: formik.values.artist,
      genre: formik.values.genre,
      track: formik.values.track,
    };
    setLocalStorage(formValues, TRACK_UPLOAD_INFO);
    history.push(PUBLIC.ADD_ALBUM);
  };

  return (
    <Layout isNegative>
      <div className="row">
        <div className="mb-5">
          <JumboText priText="Song upload" cols="11" isNegative />
          {loading && (
            <div className="col d-flex justify-content-end">
              <Spinner isNegative />
            </div>
          )}
        </div>

        <div className="col col-12 col-md-6">
          <DragAndDrop
            handleChange={trackOnChange}
            dropText="Drop the song here..."
          />
        </div>
        <div className="col col-12 col-md-6">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="mb-5 fnt-form-title">Song details</h1>
            <div className="row">
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

              <div className="col-12 col-lg-6 d-flex flex-row">
                <Select
                  classNames="me-1 w-100"
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

                {/* <div className="ms-0 ps-0 pt-6">
                  <Button isNegative onClick={handleCreateAlbum}>
                    <AddIcon size={25} />
                  </Button>
                </div> */}
              </div>
            </div>

            <div className="d-flex justify-content-end row m-0 mt-3">
              <div className="d-flex justify-content-between buttons-wrapper col col-12 col-md-4 p-0">
                <Button
                  isNegative
                  secondaryBtn
                  handleClick={() => history.goBack()}
                >
                  Back
                </Button>
                <Button isNegative submitButton>
                  Upload
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
