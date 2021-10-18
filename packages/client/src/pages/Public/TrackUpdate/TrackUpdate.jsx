import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import Input from "../../../components/Input";
import Layout from "../../../components/Layout";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import JumboText from "../../../components/JumboText";
import Spinner from "../../../components/Spinner";
import BigThumbnail from "../../../components/BigThumbnail";

import trackUpdateSchema from "./track-update-schema";
import { getAllGenres } from "../../../api/genre-api";
import { getUserAlbums } from "../../../api/users-api";
import { PUBLIC } from "../../../constants/routes";
import {
  deleteTrack,
  getTrackById,
  updateTrackById,
} from "../../../api/tracks-api";
import DeleteModal from "../../../components/DeleteModal";

function TrackUpdate() {
  const { trackId } = useRouteMatch(`${PUBLIC.TRACK_UPDATE}/:trackId`).params;
  const [genresState, setGenres] = useState([]);
  const [albumsState, setAlbums] = useState([]);
  const [trackState, setTrackState] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const userState = useSelector((state) => state.user);
  const userId = userState.mongoId;

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      title: "",
      artist: "",
      album: "",
      genre: "",
    },
    validationSchema: trackUpdateSchema,
    onSubmit: async (track) => {
      setIsLoading(true);
      const data = {
        id: trackId,
        title: track.title,
        artist: track.artist,
        album: track.album,
        genre: track.genre,
      };

      await updateTrackById(data);
      history.push(PUBLIC.MY_SONGS);
    },
  });

  async function fetchTrack(id) {
    setIsLoading(true);
    try {
      const { data } = await getTrackById(id);
      formik.setValues({
        title: data.data.name,
        artist: data.data.artist,
        album: data.data.album.title || "",
        genre: data.data.genreId.name,
      });

      setTrackState(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  async function fetchGenres() {
    setIsLoading(true);
    try {
      const { data } = await getAllGenres();
      const genresArr = data.genres.map((genre) => genre.name);
      genresArr.unshift("Select genre");
      setGenres(genresArr);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  async function fetchAlbums() {
    setIsLoading(true);
    try {
      const {
        data: { albums },
      } = await getUserAlbums(userId, 0, 10);
      const albumsArr = albums.map((album) => album.title);
      albumsArr.unshift("Select album");
      setAlbums(albumsArr);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  const handleDeleteSong = async () => {
    await deleteTrack(trackId);
    history.goBack();
  };

  useEffect(() => {
    fetchTrack(trackId);
    fetchGenres();
    fetchAlbums();
    setIsLoading(false);
  }, []);

  return (
    <Layout isNegative>
      <div className="row">
        <div className="mb-5 d-flex">
          <JumboText priText="Edit song" cols="11" isNegative />
          {isLoading && (
            <div className="col d-flex justify-content-end">
              <Spinner isNegative />
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <BigThumbnail
          image={trackState.album?.thumbnail}
          altText={trackState.album?.title}
        />

        <div className="col col-12 col-md-6 px-4 ">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="fnt-subtitle-bold mb-4 pt-3">Song details</h1>
            <div className="row">
              <Input
                label="title"
                type="title"
                id="title"
                classNames="col-12"
                isNegative
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.title}
                errorMessage={formik.errors.title}
                hasErrorMessage={formik.touched.title}
              />
              <Input
                label="artist"
                type="artist"
                id="artist"
                classNames="col-12"
                isNegative
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.artist}
                errorMessage={formik.errors.artist}
                hasErrorMessage={formik.touched.artist}
              />
              <Select
                classNames="col-12 col-md-6"
                label="genre"
                id="genre"
                type="select"
                isNegative
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.genre}
                errorMessage={formik.errors.genre}
                hasErrorMessage={formik.touched.genre}
                selected={formik.signInState}
                options={genresState}
              />
              <Select
                classNames="col-12 col-lg-6"
                label="album"
                id="album"
                type="select"
                hasAddIcon
                isNegative
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                handleAddIcon={() => history.push(PUBLIC.ADD_ALBUM)}
                value={formik.values.album}
                errorMessage={formik.errors.album}
                hasErrorMessage={formik.touched.album}
                options={albumsState}
              />
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Button
                  data-bs-toggle="modal"
                  data-bs-target="#deleteTrackModal"
                  isDanger
                >
                  Delete
                </Button>
                <Button isNegative submitButton>
                  Update
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DeleteModal
        id="deleteTrackModal"
        modalTitle="Removing track"
        modalBody={`Are you sure you want to delete this track: ${trackState.name}?`}
        handleSubmit={handleDeleteSong}
      />
    </Layout>
  );
}

export default TrackUpdate;
