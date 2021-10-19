import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import JumboText from "../../../components/JumboText";
import Layout from "../../../components/Layout";
import {
  getUserById,
  getUserTracks,
  getUserLikedTracks,
} from "../../../api/users-api";
import { PUBLIC } from "../../../constants/routes";
import BackButton from "../../../components/BackButton";
import TrackList from "../../../components/TrackList";
import { getUniqueListBy } from "../../../utils/lists";

function UserTracks() {
  const [createdTracks, setCreatedTracks] = useState([]);
  const [followedTracks, setFollowedTracks] = useState([]);
  const [userPossessive, setUserPossessive] = useState([]);
  // const [createdPage, setCreatedPage] = useState(0);
  // const [followedPage, setFollowedPage] = useState(0);
  const history = useHistory();

  const { userId } = useRouteMatch(
    `${PUBLIC.USER_VIEW}/:userId${PUBLIC.TRACKS}`,
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

  const fetchCreatedTracks = async (createdPage) => {
    try {
      const { data } = await getUserTracks(userId, createdPage, 10);
      setCreatedTracks((prev) =>
        getUniqueListBy([...prev, ...data.data], "_id"),
      );
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const fetchFollowedTracks = async (followedPage) => {
    try {
      const { data } = await getUserLikedTracks(userId, followedPage, 10);
      setFollowedTracks((prev) =>
        getUniqueListBy([...prev, ...data.data], "_id"),
      );
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  useEffect(() => {
    fetchCreatedTracks();
    fetchFollowedTracks();
    loadUser();
  }, []);

  return (
    <Layout isNegative>
      <div className="row mb-3 mb-md-5">
        <div className="col col-12 col-md-9 mb-2 mb-md-0">
          <JumboText
            priText={`${userPossessive} Tracks`}
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
          {createdTracks && (
            <TrackList
              tracks={createdTracks}
              loadMoreTracks={fetchCreatedTracks}
              // propPage={page}
            />
          )}
        </div>
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Followed</div>
          {followedTracks && (
            <TrackList
              tracks={followedTracks}
              loadMoreTracks={fetchFollowedTracks}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default UserTracks;
