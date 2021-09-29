import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import Layout from "../../../components/Layout";
import uploadSchema from "./track-schema";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import DragAndDrop from "../../../components/DragAndDrop";
import { uploadTrack } from "../../../api/tracks-api";
import { getGenres } from "../../../api/genre-api";
// import { getUserAlbum } from "../../../api/album-api";
import AddIcon from "../../../components/SVGicons/AddIcon";

export default function TrackUpload() {
  const [loading, setLoading] = useState(false);
  const [genresState, setGenres] = useState([]);
  // const [albumsState, setAlbums] = useState([]);

  useEffect(async () => {
    const { data } = await getGenres();
    // const {
    //   data: { albums },
    // } = await getUserAlbum();

    if (data.genres) {
      const genresArr = data.genres.map((genre) => genre.name);
      genresArr.unshift("Select genre");
      setGenres(genresArr);
    }
    // if (albums) {
    //   const albumsArr = albums.map((album) => album.title);
    //   albumsArr.unshift("Select album");
    //   setAlbums(albumsArr);
    // }
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      artist: "",
      album: "",
      genre: "",
      thumbnail: "",
      track: "",
    },
    validationSchema: uploadSchema,
    onSubmit: async (signInState) => {
      try {
        if (!signInState.track)
          return toast("Choose a track!", { type: "error" });

        const formData = new FormData();
        formData.append("name", signInState.name);
        formData.append("artist", signInState.artist);
        formData.append("album", signInState.album);
        formData.append("genre", signInState.genre);
        formData.append("track", signInState.track);

        console.log("formData", signInState);
        setLoading(true);
        await uploadTrack(formData);
        setLoading(false);

        return toast("Track uploaded!", { type: "success" });
      } catch (error) {
        setLoading(false);
        return toast(error.message, { type: "error" });
      }
    },
  });

  // const thumbnailOnChange = async (event) => {
  //   formik.setFieldValue("thumbnail", event.target.files[0]);
  // };

  const trackOnChange = async (files) => {
    formik.setFieldValue("track", files[0]);
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
                // options={["", "rock", "jazz"]}
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
                // options={albumsState}
                options={["", "Album 1", "Album 2"]}
              />

              <div className="col-1 ms-0 ps-0 pt-6">
                <Button isNegative>
                  <AddIcon color="" size={25} />
                </Button>
              </div>
            </div>
            {loading && <h3>Loading...</h3>}

            <div className="d-flex justify-content-end my-5">
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
