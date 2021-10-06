import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import JumboText from "../../../components/JumboText";
import Layout from "../../../components/Layout";
import PlaylistList from "../../../components/PlaylistList";
import { getMyPlaylists, getFollowingPlaylists } from "../../../api/me-api";
import { PUBLIC } from "../../../constants/routes";

function MyPlaylists() {
  const [createdPlaylists, setCreatedPlaylists] = useState([]);
  const [likedPlaylists, setLikedPlaylists] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const [loaded, setLoaded] = useState(false);

  const fetchCreatedPlaylists = async () => {
    try {
      const { data } = await getMyPlaylists();
      setCreatedPlaylists(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const fetchLikedPlaylists = async () => {
    try {
      const { data } = await getFollowingPlaylists();
      setLikedPlaylists(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handleSearchChange = async (e) => {
    setSearchBar(e.target.value);
  };

  const handleAddLikedColumn = (song, liked) => {
    setLoaded(false);
    try {
      if (liked) {
        const updatedUploadedSongs = createdPlaylists.map((bySong) => {
          if (bySong._id === song._id) return { ...bySong, isLiked: liked };
          return bySong;
        });
        const updatedLikedSongs = likedPlaylists.filter(
          (v) => v._id === song._id,
        );

        if (!updatedLikedSongs.length)
          setLikedPlaylists((prevSongs) => [...prevSongs, song]);

        setCreatedPlaylists(updatedUploadedSongs);
        setLoaded(true);
      } else {
        const updatedLikedSongs = likedPlaylists.filter(
          (v) => v._id !== song._id,
        );
        const updatedUploadedSongs = createdPlaylists.map((bySong) => {
          if (bySong._id === song._id) return { ...bySong, isLiked: liked };
          return bySong;
        });
        setLikedPlaylists(updatedLikedSongs);
        setCreatedPlaylists(updatedUploadedSongs);
        setLoaded(true);
      }
    } catch (error) {
      toast(error.message, { type: "error" });
      setLoaded(true);
    }
  };

  useEffect(() => {
    fetchCreatedPlaylists();
    fetchLikedPlaylists();
    setLoaded(true);
  }, []);

  return (
    <Layout isNegative>
      <div className="row mb-5">
        <div className="col col-9">
          <JumboText priText="My Playlists" cols="12" isNegative />
        </div>
        <div className="col col-3">
          <Link className="float-end p-3" to={PUBLIC.ADD_PLAYLIST}>
            <Button isNegative>New Playlist</Button>
          </Link>
        </div>
        <div className="col-12">
          <form className="">
            <Input
              id="searchBar"
              name="searchBar"
              type="text"
              placeholder="Search"
              handleChange={handleSearchChange}
              // handleBlur={handleSearchChange}
              value={searchBar}
              classNames="col-12 col-md-6 col-lg-4"
              isNegative
            />
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Created</div>
          {loaded && createdPlaylists && (
            <PlaylistList
              playlists={createdPlaylists}
              onAddLikedColumn={handleAddLikedColumn}
            />
          )}
        </div>
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Liked</div>
          {loaded && likedPlaylists && (
            <PlaylistList
              playlists={likedPlaylists}
              onAddLikedColumn={handleAddLikedColumn}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MyPlaylists;
