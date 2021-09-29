import React, { /* useState, */ useEffect } from "react";
import { toast } from "react-toastify";

import HomeElement from "../HomeElement";
import Button from "../Button";
import PlaylistCard from "../PlaylistCard";
import ArtistCard from "../ArtistCard";

// import {
//   getUserFollowers,
//   getUserFollowings,
//   getUserPlaylists,
//   getFollowingPlaylists,
//   getPlaylist,
//   getUserTracks,
//   getUserLikedTracks,
//   getTrack
// } from "../../api/user-api";

export default function HomeMyWave({
  genresList = false,
  artistsList = false,
  playlistsList = false,
}) {
  // const [loadStatus, setLoadStatus] = useState(false);
  // const [userFollowers, setUserFollowers] = useState([]);
  // const [userFollowings, setUserFollowings] = useState([]);
  // const [userPlaylists, setUserPlaylists] = useState([]);
  // const [userFollowingPlaylists, setUserFollowingPlaylists] = useState([]);
  // const [userTracks, setUserTracks] = useState([]);
  // const [userLikedTracks, setUserLikedTracks] = useState([]);

  // Users
  const loadUserFollowers = async () => {
    try {
      const { data } = await getUserFollowers();
      console.log(data);
      // setUserFollowers(???)
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  const loadUserFollowing = async () => {
    try {
      const { data } = await getUserFollowings();
      console.log(data);
      // setUserFollowings(???)
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  // Playlists
  const loadUserPlaylists = async () => {
    try {
      const { data } = await getUserPlaylists();
      console.log(data);
      // setUserPlaylists(data.playlists)
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  const loadUserFollowingPlaylists = async () => {
    try {
      const { data } = await getFollowingPlaylists();
      console.log(data);
      // setUserFollowingPlaylists(???)
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  // Tracks
  const loadUserTracks = async () => {
    try {
      const { data } = await getUserTracks();
      console.log(data);
      // setUserTracks(???)
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  const loadUserLikedTracks = async () => {
    try {
      const { data } = await getUserLikedTracks();
      console.log(data);
      // setUserLikedTracks(???)
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  // On load
  useEffect(() => {
    // Users
    loadUserFollowers();
    loadUserFollowing();

    // Playlists
    loadUserPlaylists();
    loadUserFollowingPlaylists();

    // Tracks
    loadUserTracks();
    loadUserLikedTracks();
  }, []);

  return (
    <div>
      {genresList && (
        <HomeElement label="Genres">
          {genresList.map((genre) => (
            <div key={genre} className="mb-2 me-2">
              <Button isSmall>{genre.toUpperCase()}</Button>
            </div>
          ))}
        </HomeElement>
      )}
      {artistsList && (
        <HomeElement label="Artists">
          {artistsList.map((artistName) => (
            <ArtistCard
              // classNames=""
              key={artistName}
              artistName={artistName}
            />
          ))}
        </HomeElement>
      )}
      {playlistsList && (
        <HomeElement label="Playlists">
          {playlistsList.map((playlistName) => (
            <PlaylistCard
              key={playlistName}
              // classNames=""
              playlistName={playlistName}
            />
          ))}
        </HomeElement>
      )}
    </div>
  );
}
