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
import useDebounce from "../../../hooks/useDebounce";
import { searchPlaylists } from "../../../api/search-api";

function MyPlaylists() {
  const [createdPlaylists, setCreatedPlaylists] = useState([]);
  const [followedPlaylists, setFollowedPlaylists] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const debouncedSearch = useDebounce(searchBar, 500);
  const [loaded, setLoaded] = useState(false);

  const fetchCreatedPlaylists = async () => {
    try {
      const { data } = await getMyPlaylists();
      setCreatedPlaylists(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const fetchFollowedPlaylists = async () => {
    try {
      const { data } = await getFollowingPlaylists();
      setFollowedPlaylists(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handleAddFollowedColumn = (playlist, isFollowed) => {
    setLoaded(false);
    try {
      if (isFollowed) {
        const updatedCreatedPlaylists = createdPlaylists.map((byPlaylist) => {
          if (byPlaylist._id === playlist._id)
            return { ...byPlaylist, isFollowed: isFollowed };
          return byPlaylist;
        });
        const updatedFollowedPlaylists = followedPlaylists.filter(
          (v) => v._id === playlist._id,
        );

        if (!updatedFollowedPlaylists.length)
          setFollowedPlaylists((prevSongs) => [...prevSongs, playlist]);

        setCreatedPlaylists(updatedCreatedPlaylists);
        setLoaded(true);
      } else {
        const updatedFollowedPlaylists = followedPlaylists.filter(
          (pl) => pl._id !== playlist._id,
        );
        const updatedCreatedPlaylists = createdPlaylists.map((byPlaylist) => {
          if (byPlaylist._id === playlist._id)
            return { ...byPlaylist, isFollowed: isFollowed };
          return byPlaylist;
        });
        setFollowedPlaylists(updatedFollowedPlaylists);
        setCreatedPlaylists(updatedCreatedPlaylists);
        setLoaded(true);
      }
    } catch (error) {
      toast(error.message, { type: "error" });
      setLoaded(true);
    }
  };

  const handleSearchChange = async (e) => {
    setSearchBar(e.target.value);
  };

  useEffect(async () => {
    try {
      const { data } = await searchPlaylists(debouncedSearch);
      const liked = data.tracks.filter((track) => track.isLiked);
      const uploaded = data.tracks.filter((track) => track.isOwner);

      setCreatedPlaylists(uploaded);
      setFollowedPlaylists(liked);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchCreatedPlaylists();
    fetchFollowedPlaylists();
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

      <div className="row g-5">
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Created</div>
          {loaded && createdPlaylists && (
            <PlaylistList
              playlists={createdPlaylists}
              onAddFollowedColumn={handleAddFollowedColumn}
            />
          )}
        </div>
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Followed</div>
          {loaded && followedPlaylists && (
            <PlaylistList
              playlists={followedPlaylists}
              onAddFollowedColumn={handleAddFollowedColumn}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MyPlaylists;
