import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

import { toast } from "react-toastify";

import { getUserById } from "../../../api/users-api";
import { PUBLIC } from "../../../constants/routes";

import Layout from "../../../components/Layout";
// import HomeElement from "../../../components/HomeElement";
// import PlaylistCard from "../../../components/PlaylistCard";
// import GenreCard from "../../../components/GenreCard";
// import TrackList from "../../../components/TrackList";
// import TrackCard from "../../../components/TrackCard";

export default function UserView() {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  //   const [userFollowers, setUserFollowers] = useState([]);
  //   const [userFollowings, setUserFollowings] = useState([]);
  //   const [userPlaylists, setUserPlaylists] = useState([]);
  //   const [userAlbums, setUserAlbums] = useState([]);
  //   const [userUploadedTracks, setUserUploadedTracks] = useState([]);
  //   const [userLikedTracks, setUserLikedTracks] = useState([]);

  const { userId } = useRouteMatch(`${PUBLIC.USERS}/:userId`).params;
  console.log(userId);

  const loadUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await getUserById(userId);
      setUser(data);
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Layout isNegative>
      <div className="row p-0 g-4">
        {/* Left side */}
        <div className="col col-12 col-md-10 ps-0">
          {/* Username */}
          <h1 className="fnt-page-title mb-5">{"Username".toUpperCase()}</h1>
          <code>{user}</code>
        </div>
        {/* Right side */}
        <div className="col col-12 col-md-2 pe-0">right</div>
      </div>
    </Layout>
  );
}
