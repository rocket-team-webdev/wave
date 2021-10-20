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

import { getUniqueListBy } from "../../../utils/lists";
import { generatePossessive } from "../../../utils/possessiveFunction";

function UserPlaylists() {
  const [loadStatus, setLoadStatus] = useState({
    createdPlaylists: false,
    followedPlaylists: false,
  });
  const [createdPlaylists, setCreatedPlaylists] = useState([]);
  const [followedPlaylists, setFollowedPlaylists] = useState([]);
  const [userPossessive, setUserPossessive] = useState([]);
  const [docTitle, setDocTitle] = useState("Loading user");

  const history = useHistory();

  const { userId } = useRouteMatch(
    `${PUBLIC.USER_VIEW}/:userId${PUBLIC.PLAYLISTS}`,
  ).params;

  const loadUser = async () => {
    try {
      const { data } = await getUserById(userId);
      setUserPossessive(generatePossessive(data.data.firstName));
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

  const fetchCreatedPlaylists = async (createdPage) => {
    try {
      const { data } = await getUserPlaylists(userId, createdPage, 5);
      setCreatedPlaylists((prev) =>
        getUniqueListBy([...prev, ...data.data], "_id"),
      );
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoadStatus((prev) => ({ ...prev, createdPlaylists: true }));
  };

  const fetchFollowedPlaylists = async (followedPage) => {
    try {
      const { data } = await getUserFollowingPlaylists(userId, followedPage, 5);
      setFollowedPlaylists((prev) =>
        getUniqueListBy([...prev, ...data.data], "_id"),
      );
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

  useEffect(() => {
    setDocTitle(userPossessive);
  }, [userPossessive]);

  return (
    <Layout docTitle={docTitle} isNegative>
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
            createdPlaylists && (
              <PlaylistList
                playlists={createdPlaylists}
                loadMoreTracks={fetchCreatedPlaylists}
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
                loadMoreTracks={fetchFollowedPlaylists}
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

export default UserPlaylists;
