import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
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
  const location = useLocation();
  const [createdPlaylists, setCreatedPlaylists] = useState([]);
  const [followedPlaylists, setFollowedPlaylists] = useState([]);
  const userState = useSelector((state) => state.user);
  const [searchBar, setSearchBar] = useState("");
  const debouncedSearch = useDebounce(searchBar, 500);

  const history = useHistory();

  const fetchCreatedPlaylists = async () => {
    const init = 0;
    const limit = 150;
    try {
      const { data } = await getMyPlaylists(init, limit);
      setCreatedPlaylists(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const fetchFollowedPlaylists = async () => {
    const init = 0;
    const limit = 150;
    try {
      const { data } = await getFollowingPlaylists(init, limit);
      setFollowedPlaylists(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handleAddFollowedColumn = (playlist, isFollowed) => {
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
      }
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handleSearchChange = async (e) => {
    setSearchBar(e.target.value);
  };

  useEffect(async () => {
    try {
      const { data } = await searchPlaylists(debouncedSearch);
      const currentUserId = userState.mongoId;
      const followed = data.playlist.filter((playlist) => playlist.isFollowed);
      const created = data.playlist.filter(
        (playlist) => playlist.userId === currentUserId,
      );

      setCreatedPlaylists(created);
      setFollowedPlaylists(followed);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchCreatedPlaylists();
    fetchFollowedPlaylists();
  }, []);

  return (
    <Layout isNegative>
      <div className="row mb-5">
        <div className="col col-9">
          <JumboText priText="My Playlists" cols="12" isNegative />
        </div>
        <div className="d-flex justify-content-end col col-3">
          <div className="p-0 mt-3">
            <Button
              classNames="me-3"
              isNegative
              secondaryBtn
              handleClick={() => history.goBack()}
            >
              Back
            </Button>
          </div>
          <Link
            className="float-end py-3"
            to={{
              pathname: `${PUBLIC.ADD_PLAYLIST}`,
              state: {
                referrer: location.pathname,
              },
            }}
          >
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
          {createdPlaylists && (
            <PlaylistList
              playlists={createdPlaylists}
              onAddFollowedColumn={handleAddFollowedColumn}
            />
          )}
        </div>
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Followed</div>
          {followedPlaylists && (
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
