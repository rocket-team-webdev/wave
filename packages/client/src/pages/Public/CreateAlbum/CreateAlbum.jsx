import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import Layout from "../../../components/Layout";
import albumSchema from "./Album-schema";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import DragAndDrop from "../../../components/DragAndDrop";
import { addAlbum } from "../../../api/album-api";

import { PUBLIC } from "../../../constants/routes";

// import { uploadTrack } from "../../../api/tracks-api";
// import { getUserAlbum } from "../../../api/album-api";

export default function CreateAlbum() {
  // const [albumsState, setAlbums] = useState([]);

  // useEffect(async () => {
  //   const {
  //     data: { albums },
  //   } = await getUserAlbum();

  //   if (albums) {
  //     const albumsArr = albums.map((album) => album.title);
  //     albumsArr.unshift("Select album");
  //     setAlbums(albumsArr);
  //   }
  // }, []);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      title: "",
      year: "",
      thumbnail: "",
    },
    validationSchema: albumSchema,
    onSubmit: async (albumState) => {
      try {
        // if (!albumState.track)
        //   return toast("Choose a track!", { type: "error" });

        const formData = new FormData();
        formData.append("title", albumState.title);
        formData.append("year", albumState.year);
        formData.append("thumbnail", albumState.thumbnail);
        console.log("formData", formData);
        await addAlbum(formData);
        history.push(PUBLIC.TRACK_UPLOAD);
        return toast("Album created!", { type: "success" });
      } catch (error) {
        return toast(error.message, { type: "error" });
      }
    },
  });

  // const thumbnailOnChange = async (event) => {
  //   formik.setFieldValue("thumbnail", event.target.files[0]);
  // };

  const thumbnailOnChange = async (files) => {
    formik.setFieldValue("thumbnail", files[0]);
  };

  return (
    <Layout isNegative>
      <div className="row ">
        <div className="col col-12 col-md-6 p-4">
          <p className="fnt-sidebar fnt-light lh-1">New album</p>
          <DragAndDrop acceptFiles="image/*" handleChange={thumbnailOnChange} />
        </div>

        <div className="col col-12 col-md-6 mt-10 px-5">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="fnt-subtitle-bold mb-4">Album details</h1>
            <div className="row">
              <Input
                label="title"
                type="text"
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
                label="release year"
                type="number"
                id="year"
                classNames="col-12 col-md-6"
                placeholder=""
                isNegative
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.year}
                errorMessage={formik.errors.year}
                hasErrorMessage={formik.touched.year}
              />
              <div className="col-12 col-md-6 d-flex align-items-center text-center">
                <p className="negative-input p-3">
                  IF YOU WISH, DON&apos;T FORGET TO UPLOAD YOUR COVER
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-end my-4">
              <Button isNegative submitButton>
                Add Album
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
