import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import HomeElement from "../HomeElement";
import GenreCard from "../GenreCard";
import UserCard from "../UserCard";
import ArtistCard from "../ArtistCard";
import PlaylistList from "../PlaylistList/PlaylistList";
import PlaylistCard from "../PlaylistCard";
import TrackList from "../TrackList";

import { PUBLIC } from "../../constants/routes";

import {
  // getMyFollowers,
  getMyFollowings,
  getMyPlaylists,
  getFollowingPlaylists,
  // getPlaylist,
  getMyTracks,
  getLikedTracks,
  // getTrack,
} from "../../api/me-api";

export default function HomeMyWave({ artistsList = false }) {
  // const [loadStatus, setLoadStatus] = useState(false);
  // const [userFollowers, setUserFollowers] = useState([]);
  const [myFollowings, setMyFollowings] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [myFollowingPlaylists, setMyFollowingPlaylists] = useState([]);
  const [myTracks, setMyTracks] = useState([]);
  const [userLikedTracks, setUserLikedTracks] = useState([]);

  // Users
  // const loadMyFollowers = async () => {
  //   try {
  //     const { data } = await getMyFollowers();
  //     console.log(data);
  //     // setUserFollowers(???)
  //   } catch (err) {
  //     toast(err.message, { type: "error" });
  //   }
  // };

  const loadMyFollowing = async () => {
    try {
      const { data } = await getMyFollowings();
      setMyFollowings(data.data);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  // Playlists
  const loadMyPlaylists = async () => {
    try {
      const { data } = await getMyPlaylists();
      setUserPlaylists(data.data);
    } catch (err) {
      toast(`Error getting your playlists! Error message: ${err.message}`, {
        type: "error",
      });
    }
  };

  const loadFollowingPlaylists = async () => {
    try {
      const { data } = await getFollowingPlaylists();
      setMyFollowingPlaylists(data.data);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  // Tracks
  const loadMyTracks = async () => {
    try {
      const { data } = await getMyTracks();
      setMyTracks(data.data);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  const loadMyLikedTracks = async () => {
    try {
      const { data } = await getLikedTracks();
      setUserLikedTracks(data.data);
    } catch (err) {
      toast(err.message, { type: "error" });
    }
  };

  // On load
  useEffect(() => {
    // Users
    // loadMyFollowers();
    loadMyFollowing();

    // Playlists
    loadMyPlaylists();
    loadFollowingPlaylists();

    // Tracks
    loadMyTracks();
    loadMyLikedTracks();
  }, []);

  const myGenresList = ["Mathi", "Nacho", "Hugo", "Brahim", "Ernest", "Rick"];

  return (
    <>
      {/* Left */}
      <div className="col col-12 col-md-10 row p-0 m-0">
        {/* User playlists */}
        {userPlaylists.length > 0 && (
          <HomeElement
            label="My playlists"
            to={PUBLIC.MY_PLAYLISTS}
            cols="6"
            isAnimationContainer
          >
            {userPlaylists && (
              <PlaylistList
                playlists={userPlaylists}
                onAddFollowedColumn={() => {}}
              />
            )}
          </HomeElement>
        )}
        {/* Following playlists */}
        {myFollowingPlaylists.length > 0 && (
          <HomeElement
            label="Following playlists"
            cols="6"
            isAnimationContainer
          >
            {myFollowingPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist._id}
                playListId={playlist._id}
                playlistName={playlist.name}
                userId={playlist.userId}
                // classNames=""
              />
            ))}
          </HomeElement>
        )}
        {/* User tracks */}
        {myTracks.length > 0 && (
          <HomeElement label="My tracks" to={PUBLIC.MY_SONGS} cols="6">
            <TrackList tracks={myTracks} setTracks={setMyTracks} />
          </HomeElement>
        )}
        {/* Liked tracks */}
        {userLikedTracks.length > 0 && (
          <HomeElement label="Liked songs" to={PUBLIC.MY_SONGS} cols="6">
            <TrackList
              tracks={userLikedTracks}
              setTracks={setUserLikedTracks}
            />
          </HomeElement>
        )}
      </div>
      {/* Right */}
      <div className="col col-12 col-md-2">
        {/* Genres */}
        {myGenresList.length > 0 && (
          <HomeElement label="My genres" isAnimationContainer>
            {myGenresList.map((genre) => (
              <div key={genre} className="mb-2 me-2">
                <GenreCard>{genre.toUpperCase()}</GenreCard>
              </div>
            ))}
          </HomeElement>
        )}
        {/* Following */}
        {myFollowings.length > 0 && (
          <HomeElement label="Following users" isAnimationContainer>
            {myFollowings.map((following) => (
              <UserCard key={following._id} userName={following.firstName} />
            ))}
          </HomeElement>
        )}
        {/* Artists */}
        {artistsList.length > 0 && (
          <HomeElement label="Artists" isAnimationContainer>
            {artistsList.map((artistName) => (
              <ArtistCard
                key={artistName}
                artistName={artistName}
                classNames="mb-3"
              />
            ))}
          </HomeElement>
        )}
      </div>
    </>
  );
}
