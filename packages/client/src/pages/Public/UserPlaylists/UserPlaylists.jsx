import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import JumboText from "../../../components/JumboText";
import Layout from "../../../components/Layout";
import PlaylistList from "../../../components/PlaylistList";
import {
  getUserById,
  getUserPlaylists,
  getUserFollowingPlaylists,
} from "../../../api/users-api";
import { PUBLIC } from "../../../constants/routes";

function UserPlaylists() {
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
  };

  const fetchFollowedPlaylists = async () => {
    try {
      const { data } = await getUserFollowingPlaylists(userId);
      setFollowedPlaylists(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  // const handleAddFollowedColumn = (playlist, isFollowed) => {
  //   try {
  //     if (isFollowed) {
  //       const updatedCreatedPlaylists = createdPlaylists.map((byPlaylist) => {
  //         if (byPlaylist._id === playlist._id)
  //           return { ...byPlaylist, isFollowed: isFollowed };
  //         return byPlaylist;
  //       });
  //       const updatedFollowedPlaylists = followedPlaylists.filter(
  //         (v) => v._id === playlist._id,
  //       );

  //       if (!updatedFollowedPlaylists.length)
  //         setFollowedPlaylists((prevSongs) => [...prevSongs, playlist]);

  //       setCreatedPlaylists(updatedCreatedPlaylists);
  //     } else {
  //       const updatedFollowedPlaylists = followedPlaylists.filter(
  //         (pl) => pl._id !== playlist._id,
  //       );
  //       const updatedCreatedPlaylists = createdPlaylists.map((byPlaylist) => {
  //         if (byPlaylist._id === playlist._id)
  //           return { ...byPlaylist, isFollowed: isFollowed };
  //         return byPlaylist;
  //       });
  //       setFollowedPlaylists(updatedFollowedPlaylists);
  //       setCreatedPlaylists(updatedCreatedPlaylists);
  //     }
  //   } catch (error) {
  //     toast(error.message, { type: "error" });
  //   }
  // };

  useEffect(() => {
    fetchCreatedPlaylists();
    fetchFollowedPlaylists();
    loadUser();
  }, []);

  return (
    <Layout isNegative>
      <div className="row mb-5">
        <div className="col col-9">
          <JumboText
            priText={`${userPossessive} Playlists`}
            cols="12"
            isNegative
          />
        </div>
        <div className="col col-3">
          <Link className="float-end p-3" to={`${PUBLIC.USERS}/${userId}`}>
            <Button isNegative>Back</Button>
          </Link>
        </div>
      </div>

      <div className="row g-5">
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Created</div>
          {createdPlaylists && (
            <PlaylistList
              playlists={createdPlaylists}
              // onAddFollowedColumn={handleAddFollowedColumn}
            />
          )}
        </div>
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Followed</div>
          {followedPlaylists && (
            <PlaylistList
              playlists={followedPlaylists}
              // onAddFollowedColumn={handleAddFollowedColumn}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default UserPlaylists;
