/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

import { toast } from "react-toastify";

import { getUserById, getUserPlaylists } from "../../../api/users-api";
import { PUBLIC } from "../../../constants/routes";

import Layout from "../../../components/Layout";
// import HomeElement from "../../../components/HomeElement";
// import GenreCard from "../../../components/GenreCard";
// import PlaylistList from "../../../components/PlaylistList";
// import TrackList from "../../../components/TrackList";
// import TrackCard from "../../../components/TrackCard";

export default function UserView() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  //   const [userFollowers, setUserFollowers] = useState([]);
  //   const [userFollowings, setUserFollowings] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  //   const [userAlbums, setUserAlbums] = useState([]);
  //   const [userUploadedTracks, setUserUploadedTracks] = useState([]);
  //   const [userLikedTracks, setUserLikedTracks] = useState([]);

  const { userId } = useRouteMatch(`${PUBLIC.USERS}/:userId`).params;

  const loadUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await getUserById(userId);
      setUser(data.data);
      console.log(data.data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      const { data } = await getUserPlaylists(userId);
      setUserPlaylists(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
    loadUserData();
  }, []);

  return (
    <Layout isNegative>
      <div className="row p-0 g-4">
        <div className="col col-12 ps-0">
          {/* Username */}
          <h1 className="fnt-page-title mb-5">{user.firstName}</h1>
          {/* Bottom */}
          <div className="bottom row p-0 mt-5">
            {/* Bottom left */}
            <div className="col col-12 col-md-10 bottom-left">
              <code>{JSON.stringify(userPlaylists)}</code>
            </div>
            {/* Bottom right */}
            <div className="col col-12 col-md-2 bottom-right">right</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
