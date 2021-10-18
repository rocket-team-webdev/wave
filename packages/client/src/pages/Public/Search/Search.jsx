import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  searchPlaylists,
  searchTrack,
  searchAlbum,
  searchUser,
} from "../../../api/search-api";
import AlbumList from "../../../components/AlbumList/AlbumList";
import Button from "../../../components/Button";
import HomeElement from "../../../components/HomeElement";
import Input from "../../../components/Input";
import JumboText from "../../../components/JumboText";
import Layout from "../../../components/Layout";
import PlaylistList from "../../../components/PlaylistList";
import Spinner from "../../../components/Spinner";
import TrackList from "../../../components/TrackList";
import UserList from "../../../components/UserList/UserList";
import { PUBLIC } from "../../../constants/routes";

function Search() {
  const urlQuery = new URLSearchParams(useLocation().search).get("q");
  const [searchBar, setSearchBar] = useState(urlQuery || "");
  const [foundTracks, setFoundTracks] = useState({ data: [], loaded: false });
  const [foundPlaylists, setFoundPlaylists] = useState({
    data: [],
    loaded: false,
  });
  const [foundAlbums, setFoundAlbums] = useState({ data: [], loaded: false });
  const [foundUsers, setFoundUsers] = useState({ data: [], loaded: false });
  const history = useHistory();

  const trackSearchAndSet = async (searchParam) => {
    try {
      const { data } = await searchTrack(searchParam, 0, 7);
      setFoundTracks({ data: data.tracks, loaded: true });
    } catch (error) {
      toast(error.message, { type: "error" });
      setFoundTracks({ ...foundTracks, loaded: true });
    }
  };

  const playlistSearchAndSet = async (searchParam) => {
    try {
      const { data } = await searchPlaylists(searchParam, 0, 4);
      setFoundPlaylists({ data: data.playlist, loaded: true });
    } catch (error) {
      toast(error.message, { type: "error" });
      setFoundPlaylists({ ...foundPlaylists, loaded: true });
    }
  };

  const albumSearchAndSet = async (searchParam) => {
    try {
      const { data } = await searchAlbum(searchParam, 0, 2);
      setFoundAlbums({ data: data.album, loaded: true });
    } catch (error) {
      toast(error.message, { type: "error" });
      setFoundAlbums({ ...foundAlbums, loaded: true });
    }
  };

  const userSearchAndSet = async (searchParam) => {
    try {
      const { data } = await searchUser(searchParam, 0, 6);
      setFoundUsers({ data: data.users, loaded: true });
    } catch (error) {
      toast(error.message, { type: "error" });
      setFoundUsers({ ...foundUsers, loaded: true });
    }
  };

  const fullSearch = (searchParam) => {
    trackSearchAndSet(searchParam);
    playlistSearchAndSet(searchParam);
    albumSearchAndSet(searchParam);
    userSearchAndSet(searchParam);
  };

  const handleSearchChange = async (e) => {
    setSearchBar(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fullSearch(searchBar);
    history.push({
      search: `?q=${searchBar}`,
    });
  };

  useEffect(() => {
    if (searchBar !== "") {
      fullSearch(searchBar);
    }
  }, []);

  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row p-0 g-4">
        {/* Left side */}
        <div className="col col-12 col-lg-4 left-side mt-4">
          <div className="d-flex justify-content-between align-items-start">
            <JumboText priText="Search" cols="11" isNegative />
          </div>
          <div className="col-12">
            <form
              className="row d-flex align-items-center"
              onSubmit={handleSubmit}
            >
              <Input
                id="searchBar"
                name="searchBar"
                type="text"
                placeholder="Search"
                handleChange={handleSearchChange}
                value={searchBar}
                classNames="w-100"
                hasSubmitIcon
                isNegative
              />
            </form>
          </div>
          <Link className="float-start p-0 pt-4" to={PUBLIC.HOME}>
            <Button isNegative>Back</Button>
          </Link>
        </div>

        {/* Right side */}
        <div className="col col-12 col-lg-8 right-side pe-0 row gy-4">
          <div className="col col-12 col-xxl-6">
            {foundTracks.loaded ? (
              <HomeElement label="found tracks" cols="12" isAnimationContainer>
                {foundTracks.data.length > 0 ? (
                  <TrackList tracks={foundTracks.data} />
                ) : (
                  <p>Nothing found</p>
                )}
              </HomeElement>
            ) : (
              <HomeElement label="loading">
                <Spinner isNegative />
              </HomeElement>
            )}
          </div>
          <div className="col col-12 col-xxl-6">
            {foundPlaylists.loaded ? (
              <HomeElement
                label="found playlists"
                cols="12"
                isAnimationContainer
              >
                {foundPlaylists.data.length > 0 ? (
                  <PlaylistList playlists={foundPlaylists.data} />
                ) : (
                  <p>Nothing found</p>
                )}
              </HomeElement>
            ) : (
              <HomeElement label="loading">
                <Spinner isNegative />
              </HomeElement>
            )}
          </div>
          <div className="col col-12 col-xxl-6">
            {foundUsers.loaded ? (
              <HomeElement label="found users" cols="12" isAnimationContainer>
                {foundUsers.data.length > 0 ? (
                  <UserList users={foundUsers.data} />
                ) : (
                  <p>Nothing found</p>
                )}
              </HomeElement>
            ) : (
              <HomeElement label="loading">
                <Spinner isNegative />
              </HomeElement>
            )}
          </div>
          <div className="col col-12 col-xxl-6">
            {foundAlbums.loaded ? (
              <HomeElement label="found albums" cols="12" isAnimationContainer>
                {foundAlbums.data.length > 0 ? (
                  <AlbumList albums={foundAlbums.data} />
                ) : (
                  <p>Nothing found</p>
                )}
              </HomeElement>
            ) : (
              <HomeElement label="loading">
                <Spinner isNegative />
              </HomeElement>
            )}
          </div>
        </div>
      </div>
      {/* <div className="row mb-5">
        <div className="col col-9">
          <JumboText priText="Search" cols="12" isNegative />
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
      </div> */}
    </Layout>
  );
}

export default Search;
