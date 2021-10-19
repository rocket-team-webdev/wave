import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import JumboText from "../../../components/JumboText";
import Layout from "../../../components/Layout";
import PlaylistList from "../../../components/PlaylistList";
import {
  getUserById,
  getUserPlaylists,
  getUserFollowingPlaylists,
} from "../../../api/users-api";
import { PUBLIC } from "../../../constants/routes";
import BackButton from "../../../components/BackButton";
import Spinner from "../../../components/Spinner";

function UserPlaylists() {
  const [loadStatus, setLoadStatus] = useState({
    createdPlaylists: false,
    followedPlaylists: false,
  });
  const [createdPlaylists, setCreatedPlaylists] = useState([]);
  const [followedPlaylists, setFollowedPlaylists] = useState([]);
  const [userPossessive, setUserPossessive] = useState([]);
  const history = useHistory();

  const { userId } = useRouteMatch(
    `${PUBLIC.USER_VIEW}/:userId${PUBLIC.PLAYLISTS}`,
  ).params;

  const loadUser = async () => {
    try {
      const { data } = await getUserById(userId);
      // setUserData(data.data);
      setUserPossessive(
        data.data.firstName.slice(-1) === "s"
          ? `${data.data.firstName}'`
          : `${data.data.firstName}'s`,
      );
    } catch (error) {
      if (error.response.status === 500) {
        toast("User not found", {
          type: "error",
        });
        history.push(PUBLIC.NOT_FOUND);
      } else {
        toast(error.message, { type: "error" });
      }
    }
  };

  const fetchCreatedPlaylists = async () => {
    try {
      const { data } = await getUserPlaylists(userId);
      setCreatedPlaylists(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, createdPlaylists: true }));
  };

  const fetchFollowedPlaylists = async () => {
    try {
      const { data } = await getUserFollowingPlaylists(userId);
      setFollowedPlaylists(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, followedPlaylists: true }));
  };

  useEffect(() => {
    fetchCreatedPlaylists();
    fetchFollowedPlaylists();
    loadUser();
  }, []);

  return (
    <Layout isNegative>
      <div className="row mb-3 mb-md-5">
        <div className="col col-12 col-md-9 mb-2 mb-md-0">
          <JumboText
            priText={`${userPossessive} Playlists`}
            cols="12"
            isNegative
          />
        </div>
        <div className="d-flex justify-content-start justify-content-md-end col col-12 col-md-3 mb-4 mb-md-0">
          <div className="p-0 mt-2">
            <BackButton isNegative />
          </div>
        </div>
      </div>

      <div className="row g-5">
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Created</div>
          {loadStatus.createdPlaylists ? (
            createdPlaylists && <PlaylistList playlists={createdPlaylists} />
          ) : (
            <Spinner classNames="ms-2" isNegative />
          )}
        </div>
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Followed</div>
          {loadStatus.followedPlaylists ? (
            followedPlaylists && <PlaylistList playlists={followedPlaylists} />
          ) : (
            <Spinner classNames="ms-2" isNegative />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default UserPlaylists;
