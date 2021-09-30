import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { PUBLIC } from "../../constants/routes";

import HomeElement from "../HomeElement";
import Button from "../Button";
import UserCard from "../UserCard";
import ArtistCard from "../ArtistCard";
import PlaylistCard from "../PlaylistCard";
import {
  getMyFollowers,
  getMyFollowings,
  getMyPlaylists,
  getFollowingPlaylists,
  // getPlaylist,
  getMyTracks,
  getLikedTracks,
  // getTrack,
} from "../../api/me-api";

export default function HomeMyWave({
  artistsList = false,
  playlistsList = false,
}) {
  // const [loadStatus, setLoadStatus] = useState(false);
  // const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
  // const [userPlaylists, setUserPlaylists] = useState([]);
  // const [userFollowingPlaylists, setUserFollowingPlaylists] = useState([]);
  // const [userTracks, setUserTracks] = useState([]);
  // const [userLikedTracks, setUserLikedTracks] = useState([]);

  // Users
  const loadMyFollowers = async () => {
    try {
      const { data } = await getMyFollowers();
      console.log(data);
      // setUserFollowers(???)
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  const loadMyFollowing = async () => {
    try {
      const { data } = await getMyFollowings();
      setUserFollowings(data.data);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  // Playlists
  const loadMyPlaylists = async () => {
    try {
      const { data } = await getMyPlaylists();
      console.log(data);
      // setUserPlaylists(data.playlists);
    } catch (err) {
      toast(`Error getting your playlists! Error message: ${err.message}`, {
        type: "error",
      });
    }
  };

  const loadFollowingPlaylists = async () => {
    try {
      const { data } = await getFollowingPlaylists();
      console.log(data);
      // setUserFollowingPlaylists(???)
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  // Tracks
  const loadMyTracks = async () => {
    try {
      const { data } = await getMyTracks();
      console.log(data);
      // setUserTracks(???)
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  const loadMyLikedTracks = async () => {
    try {
      const { data } = await getLikedTracks();
      console.log(data);
      // setUserLikedTracks(???)
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  // On load
  useEffect(() => {
    // Users
    loadMyFollowers();
    loadMyFollowing();

    // Playlists
    loadMyPlaylists();
    loadFollowingPlaylists();

    // Tracks
    loadMyTracks();
    loadMyLikedTracks();
  }, []);

  const genresList = ["Mathi", "Nacho", "Hugo", "Brahim", "Ernest", "Rick"];
  // const followings = ["Mathi", "Nacho", "Hugo", "Brahim", "Ernest", "Rick"];
  const mySongs = [
    "Channel Suite 1",
    "Dani California",
    "Clint Eastwood",
    "Kings' Season",
  ];
  const likedSongs = [
    "Snow (Hey Oh)",
    "Glassworks",
    "Man with a movie camera",
    "Wish you were here",
  ];

  return (
    <div className="row gx-4 gy-5">
      {genresList && (
        <HomeElement
          label="My genres"
          cols={genresList && userFollowings.length > 0 ? "6" : "12"}
        >
          {genresList.map((genre) => (
            <div key={genre} className="mb-2 me-2">
              <Button isSmall>{genre.toUpperCase()}</Button>
            </div>
          ))}
        </HomeElement>
      )}
      {userFollowings.length > 0 && (
        <HomeElement
          label="Following users"
          cols={genresList && userFollowings.length > 0 ? "6" : "12"}
        >
          {userFollowings.map((following) => (
            <UserCard key={following._id} userName={following.firstName} />
          ))}
        </HomeElement>
      )}
      {artistsList && (
        <HomeElement label="Artists">
          {artistsList.map((artist) => (
            <ArtistCard
              // classNames=""
              key={artist}
              artistName={artist}
            />
          ))}
        </HomeElement>
      )}
      {playlistsList && (
        <HomeElement label="My playlists">
          {playlistsList.map((playlist) => (
            <PlaylistCard
              key={playlist}
              // classNames=""
              playlistName={playlist}
            />
          ))}
        </HomeElement>
      )}
      {playlistsList && (
        <HomeElement label="Following playlists">
          {playlistsList.map((playlist) => (
            <PlaylistCard
              key={playlist}
              // classNames=""
              playlistName={playlist}
            />
          ))}
        </HomeElement>
      )}
      {mySongs && (
        <HomeElement label="My songs" to={PUBLIC.MY_SONGS}>
          {mySongs.map((song, i) => (
            <>
              {/* TODO Track component here */}
              <p key={song}>{`${i + 1} | Song name `}</p>
              <br />
            </>
          ))}
        </HomeElement>
      )}
      {likedSongs && (
        <HomeElement label="Liked songs" to={PUBLIC.MY_SONGS}>
          {likedSongs.map((song, i) => (
            <>
              {/* TODO Track component here */}
              <p key={song}>{`${i + 1} | Song name `}</p>
              <br />
            </>
          ))}
        </HomeElement>
      )}
    </div>
  );
}
