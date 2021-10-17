import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import JumboText from "../../../components/JumboText";
import Layout from "../../../components/Layout";
import useDebounce from "../../../hooks/useDebounce";
import AlbumList from "../../../components/AlbumList/AlbumList";
import { searchAlbum } from "../../../api/search-api";
import { getLikedAlbums, getMyAlbums } from "../../../api/me-api";

function MyAlbums() {
  const [userAlbums, setUserAlbums] = useState([]);
  const [likedAlbums, setLikedAlbums] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const debouncedSearch = useDebounce(searchBar, 500);
  const userState = useSelector((state) => state.user);

  const history = useHistory();

  async function fetchMyAlbums() {
    const init = 0;
    const limit = 12;
    try {
      const {
        data: { data },
      } = await getMyAlbums(init, limit);
      const albumsArr = data.map((album) => album);
      setUserAlbums(albumsArr);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  async function fetchLikedAlbums() {
    const init = 0;
    const limit = 12;
    try {
      const {
        data: { data },
      } = await getLikedAlbums(init, limit);
      const albumsArr = data.map((album) => album);
      setLikedAlbums(albumsArr);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  const handleAddLikedColumn = (album, liked) => {
    try {
      if (liked) {
        const updatedUserAlbums = userAlbums.map((byAlbum) => {
          if (byAlbum._id === album._id) return { ...byAlbum, isLiked: liked };
          return byAlbum;
        });
        const updatedLikedAlbums = likedAlbums.filter(
          (v) => v._id === album._id,
        );

        if (!updatedLikedAlbums.length)
          setLikedAlbums((prevSongs) => [...prevSongs, album]);

        setUserAlbums(updatedUserAlbums);
      } else {
        const updatedLikedAlbums = likedAlbums.filter(
          (v) => v._id !== album._id,
        );
        const updatedUserAlbums = userAlbums.map((byAlbum) => {
          if (byAlbum._id === album._id) return { ...byAlbum, isLiked: liked };
          return byAlbum;
        });
        setLikedAlbums(updatedLikedAlbums);
        setUserAlbums(updatedUserAlbums);
      }
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handleSearchChange = async (e) => {
    setSearchBar(e.target.value);
  };

  useEffect(async () => {
    const init = 0;
    const limit = 12;
    try {
      const { data } = await searchAlbum(debouncedSearch, init, limit);
      const currentUserId = userState.mongoId;
      const liked = data.album.filter((album) => album.isLiked);
      const created = data.album.filter(
        (album) => album.userId === currentUserId,
      );
      setUserAlbums(created);
      setLikedAlbums(liked);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchMyAlbums();
    fetchLikedAlbums();
  }, []);

  return (
    <Layout isNegative>
      <div className="row mb-5">
        <div className="col col-9">
          <JumboText priText="My Albums" cols="12" isNegative />
        </div>
        <div className="col col-3 d-flex justify-content-end py-3">
          <div>
            <Button
              isNegative
              secondaryBtn
              handleClick={() => history.goBack()}
            >
              Back
            </Button>
          </div>
        </div>
        <div className="col-12">
          <form className="">
            <Input
              id="searchBar"
              name="searchBar"
              type="text"
              placeholder="Search"
              handleChange={handleSearchChange}
              value={searchBar}
              classNames="col-12 col-md-6 col-lg-4"
              isNegative
            />
          </form>
        </div>
      </div>

      <div className="row g-5">
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Created</div>
          {userAlbums && (
            <AlbumList
              albums={userAlbums}
              onAddLikedColumn={handleAddLikedColumn}
            />
          )}
        </div>
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Liked</div>
          {likedAlbums && (
            <AlbumList
              albums={likedAlbums}
              onAddLikedColumn={handleAddLikedColumn}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MyAlbums;
