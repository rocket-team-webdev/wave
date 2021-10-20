import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
import BackButton from "../../../components/BackButton";
import { getUniqueListBy } from "../../../utils/lists";
import Spinner from "../../../components/Spinner";

function MyPlaylists() {
  const location = useLocation();
  const [loadStatus, setLoadStatus] = useState({
    createdPlaylists: false,
    followedPlaylists: false,
  });
  const [createdPlaylists, setCreatedPlaylists] = useState([]);
  const [followedPlaylists, setFollowedPlaylists] = useState([]);
  const userState = useSelector((state) => state.user);
  const [searchBar, setSearchBar] = useState("");
  const debouncedSearch = useDebounce(searchBar, 500);

  const [page, setPage] = useState(0);
  const [pageFollowed, setPageFollowed] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const fetchCreatedPlaylists = async (createdPage) => {
    try {
      const { data } = await getMyPlaylists(createdPage, 10);
      setCreatedPlaylists((prev) =>
        getUniqueListBy([...prev, ...data.data], "_id"),
      );
      // setCreatedPlaylists(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, createdPlaylists: true }));
  };

  const fetchFollowedPlaylists = async (followedPage) => {
    try {
      const { data } = await getFollowingPlaylists(followedPage, 10);
      setFollowedPlaylists((prev) =>
        getUniqueListBy([...prev, ...data.data], "_id"),
      );
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, followedPlaylists: true }));
  };

  const fetchPlaylistsData = (fetchPage = 0) => {
    setPage(fetchPage);
    fetchCreatedPlaylists(fetchPage);
  };
  const fetchPlaylistsDataFollowed = (fetchPage = 0) => {
    setPageFollowed(fetchPage);
    fetchFollowedPlaylists(fetchPage);
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
      if (debouncedSearch !== "") {
        setIsSearching(true);
        const { data } = await searchPlaylists(debouncedSearch);
        const currentUserId = userState.mongoId;
        const followed = data.playlist.filter(
          (playlist) => playlist.isFollowed,
        );
        const created = data.playlist.filter(
          (playlist) => playlist.userId === currentUserId,
        );

        setCreatedPlaylists(created);
        setFollowedPlaylists(followed);
      } else {
        setPage(0);
        setPageFollowed(0);
        setIsSearching(false);
        fetchPlaylistsData();
        fetchPlaylistsDataFollowed();
      }
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }, [debouncedSearch]);

  return (
    <Layout docTitle="My playlists" isNegative>
      <div className="row mb-3 mb-md-5">
        <div className="col col-12 col-md-9 mb-2 mb-md-0">
          <JumboText priText="My Playlists" cols="12" isNegative />
        </div>
        <div className="d-flex justify-content-start justify-content-md-end col col-12 col-md-3 mb-4 mb-md-0">
          <div className="p-0 mt-2">
            <BackButton classNames="me-3" isNegative secondaryBtn />
          </div>
          <Link
            className="float-end py-2"
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
          <form>
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
          {loadStatus.createdPlaylists ? (
            createdPlaylists && (
              <PlaylistList
                playlists={createdPlaylists}
                onAddFollowedColumn={handleAddFollowedColumn}
                isSearching={isSearching}
                loadMoreTracks={fetchPlaylistsData}
                propPage={page}
              />
            )
          ) : (
            <Spinner classNames="ms-2" isNegative />
          )}
        </div>
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Followed</div>
          {loadStatus.followedPlaylists ? (
            followedPlaylists && (
              <PlaylistList
                playlists={followedPlaylists}
                onAddFollowedColumn={handleAddFollowedColumn}
                isSearching={isSearching}
                loadMoreTracks={fetchPlaylistsDataFollowed}
                propPage={pageFollowed}
              />
            )
          ) : (
            <Spinner classNames="ms-2" isNegative />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MyPlaylists;
