import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import Layout from "../../../components/Layout";
import uploadSchema from "./track-schema";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import DragAndDrop from "../../../components/DragAndDrop";
import { uploadTrack } from "../../../api/tracks-api";
import { getGenres } from "../../../api/genre-api";
import { getUserAlbum } from "../../../api/album-api";
import AddIcon from "../../../components/SVGicons/AddIcon";
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
    const { data } = await getGenres();
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
      <div className="row ">
        <div className="col col-12 col-md-6 p-4">
          <p className="fnt-sidebar fnt-light">Upload your song</p>
          <DragAndDrop handleChange={trackOnChange} />
        </div>

        <div className="col col-12 col-md-6 mt-10 px-5">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="fnt-subtitle-bold mb-4">Song details</h1>
            <div className="row">
              <Input
                label="name"
                type="name"
                id="name"
                classNames="col-12"
                placeholder="example: "
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
                classNames="col-12"
                placeholder=""
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                  isNegative
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.album}
                  errorMessage={formik.errors.album}
                  hasErrorMessage={formik.touched.album}
                  options={albumsState}
                />

                <div className="ms-0 ps-0 pt-6">
                  <Button isNegative onClick={handleCreateAlbum}>
                    <AddIcon color="" size={25} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end my-5">
              <Button isNegative submitButton>
                Upload
              </Button>
            </div>

            {loading && <h3>Loading...</h3>}
          </form>
        </div>
      </div>
    </Layout>
  );
}
