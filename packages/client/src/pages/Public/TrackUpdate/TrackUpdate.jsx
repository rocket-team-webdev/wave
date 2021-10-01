import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import Input from "../../../components/Input";
import Layout from "../../../components/Layout";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import AddIcon from "../../../components/SVGicons/AddIcon";

import trackUpdateSchema from "./track-update-schema";
import { getGenres } from "../../../api/genre-api";
import { getUserAlbum } from "../../../api/album-api";
import { PUBLIC } from "../../../constants/routes";
import { getTrackById, updateTrackById } from "../../../api/tracks-api";
import BigThumbnail from "../../../components/BigThumbnail/BigThumbnail";

function TrackUpdate() {
  const { trackId } = useRouteMatch(`${PUBLIC.TRACK_UPDATE}/:trackId`).params;
  const [genresState, setGenres] = useState([]);
  const [albumsState, setAlbums] = useState([]);
  const [trackState, setTrackState] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
      const { data } = await getGenres();
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
      } = await getUserAlbum();
      const albumsArr = albums.map((album) => album.title);
      albumsArr.unshift("Select album");
      setAlbums(albumsArr);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  useEffect(() => {
    fetchTrack(trackId);
    fetchGenres();
    fetchAlbums();
    setIsLoading(false);
  }, []);

  return (
    <Layout isNegative>
      <div className="row mb-5">
        <div className="col col-12">
          <p className="fnt-sidebar fnt-light">Update the song</p>
        </div>
      </div>
      <div className="row">
        {isLoading ? (
          <div className="col col-12 col-md-6 p-4 ">Loading...</div>
        ) : (
          <BigThumbnail
            image={trackState.album?.thumbnail}
            altText={trackState.album?.title}
          />
        )}

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
                classNames="col-12"
                isNegative
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.genre}
                errorMessage={formik.errors.genre}
                hasErrorMessage={formik.touched.genre}
                selected={formik.signInState}
                options={genresState}
              />
              <Select
                classNames="col-11 col-md-5"
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

              <div className="col-1 ms-0 ps-0 pt-6">
                <Button
                  isNegative
                  onClick={() => history.push(PUBLIC.ADD_ALBUM)}
                >
                  <AddIcon color="" size={25} />
                </Button>
              </div>
            </div>

            <div className="d-flex justify-content-end my-5">
              <Button isNegative submitButton>
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default TrackUpdate;