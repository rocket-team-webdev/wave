import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Input from "../../../components/Input";
import JumboText from "../../../components/JumboText";
import Layout from "../../../components/Layout";
import useDebounce from "../../../hooks/useDebounce";
import AlbumList from "../../../components/AlbumList/AlbumList";
import { searchAlbum } from "../../../api/search-api";
import { getLikedAlbums, getMyAlbums } from "../../../api/me-api";
import BackButton from "../../../components/BackButton";
import { getUniqueListBy } from "../../../utils/lists";

function MyAlbums() {
  const [userAlbums, setUserAlbums] = useState([]);
  const [likedAlbums, setLikedAlbums] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const debouncedSearch = useDebounce(searchBar, 500);
  const userState = useSelector((state) => state.user);

  const [page, setPage] = useState(0);
  const [pageLiked, setPageLiked] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  async function fetchMyAlbums(createdPage) {
    try {
      const {
        data: { data },
      } = await getMyAlbums(createdPage, 10);

      // const albumsArr = data.map((album) => album);
      // setUserAlbums(albumsArr);
      setUserAlbums((prev) => getUniqueListBy([...prev, ...data], "_id"));
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  async function fetchLikedAlbums(likedPage) {
    try {
      const {
        data: { data },
      } = await getLikedAlbums(likedPage, 10);
      // const albumsArr = data.map((album) => album);
      // setLikedAlbums(albumsArr);
      setLikedAlbums((prev) => getUniqueListBy([...prev, ...data], "_id"));
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  const fetchMyAlbumsData = (fetchPage = 0) => {
    setPage(fetchPage);
    fetchMyAlbums(fetchPage);
  };
  const fetchAlbumsDataLiked = (fetchPage = 0) => {
    setPageLiked(fetchPage);
    fetchLikedAlbums(fetchPage);
  };

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
      if (debouncedSearch !== "") {
        const { data } = await searchAlbum(debouncedSearch, init, limit);
        const currentUserId = userState.mongoId;
        const liked = data.album.filter((album) => album.isLiked);
        const created = data.album.filter(
          (album) => album.userId === currentUserId,
        );
        setUserAlbums(created);
        setLikedAlbums(liked);
      } else {
        setPage(0);
        setPageLiked(0);
        setIsSearching(false);
        fetchMyAlbumsData();
        fetchAlbumsDataLiked();
      }
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }, [debouncedSearch]);

  // useEffect(() => {
  //   fetchMyAlbums();
  //   fetchLikedAlbums();
  // }, []);

  return (
    <Layout isNegative>
      <div className="row mb-3 mb-md-5">
        <div className="col col-12 col-md-9 mb-2 mb-md-0">
          <JumboText priText="My Albums" cols="12" isNegative />
        </div>

        <div className="d-flex justify-content-start justify-content-md-end col col-12 col-md-3 mb-4 mb-md-0">
          <div className="p-0 mt-2">
            <BackButton isNegative secondaryBtn />
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
              isSearching={isSearching}
              loadMoreTracks={fetchMyAlbumsData}
              propPage={page}
            />
          )}
        </div>
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Liked</div>
          {likedAlbums && (
            <AlbumList
              albums={likedAlbums}
              onAddLikedColumn={handleAddLikedColumn}
              isSearching={isSearching}
              loadMoreTracks={fetchAlbumsDataLiked}
              propPage={pageLiked}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MyAlbums;
