import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useFormik } from "formik";
import Input from "../../../components/Input";
import Layout from "../../../components/Layout";
import trackUpdateSchema from "./track-update-schema";
import Select from "../../../components/Select";
import { getGenres } from "../../../api/genre-api";
import { getUserAlbum } from "../../../api/album-api";
import Button from "../../../components/Button";
import AddIcon from "../../../components/SVGicons/AddIcon";
import { PUBLIC } from "../../../constants/routes";
import { getTrackById } from "../../../api/tracks-api";

function TrackUpdate() {
  const { trackId } = useRouteMatch(`${PUBLIC.TRACK_UPDATE}/:trackId`).params;
  const [genresState, setGenres] = useState([]);
  const [albumsState, setAlbums] = useState([]);

  async function loadTrack(id) {
    try {
      const { data } = await getTrackById(id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(trackId);

  const history = useHistory();

  useEffect(async () => {
    loadTrack(trackId);
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

  const formik = useFormik({
    initialValues: {
      title: "Song title", // title from the track request
      artist: "Artist", // artist from the track request
      album: "", // album from the  track request
      genre: "", // genre from the  track request
      thumbnail: "", // genre from the album request
    },
    validationSchema: trackUpdateSchema,
    onSubmit: async (signInState) => {
      console.log(signInState);
      // try {
      //   if (!signInState.track)
      //     return toast("Choose a track!", { type: "error" });

      //   const formData = new FormData();
      //   formData.append("title", signInState.title);
      //   formData.append("artist", signInState.artist);
      //   formData.append("album", signInState.album);
      //   formData.append("genre", signInState.genre);
      //   // formData.append("thumbnail", signInState.thumbnail);
      //   formData.append("track", signInState.track);

      //   console.log("formData", formData);
      //   await uploadTrack(formData);
      //   return toast("Track uploaded!", { type: "success" });
      // } catch (error) {
      //   return toast(error.message, { type: "error" });
      // }
    },
  });

  return (
    <Layout isNegative>
      <div className="row mb-5">
        <div className="col col-12">
          <p className="fnt-sidebar fnt-light">Update the song</p>
        </div>
      </div>
      <div className="row">
        <div className="col col-12 col-md-6 p-4 border ">
          {/* <img src="fasdf" alt="fasdf" className="clr-light" /> */}
          <div
            className="clr-light"
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </div>

        <div className="col col-12 col-md-6 px-4 border">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="fnt-subtitle-bold mb-4">Song details</h1>
            <div className="row">
              <Input
                label="title"
                type="title"
                id="title"
                classNames="col-12"
                placeholder={formik.signInState}
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
                placeholder={formik.signInState}
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
                // options={["", "Album 1", "Album 2"]}
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
