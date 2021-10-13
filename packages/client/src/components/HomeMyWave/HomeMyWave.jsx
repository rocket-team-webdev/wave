import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import HomeElement from "../HomeElement";
import GenreCard from "../GenreCard";
import UserCard from "../UserCard";
import ArtistCard from "../ArtistCard";

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

import PlaylistList from "../PlaylistList/PlaylistList";
import TrackList from "../TrackList";

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

  const handleAddFollowingPlaylists = (playlist, isFollowed) => {
    try {
      if (isFollowed) {
        const updatedUserPlaylists = userPlaylists.map((byPlaylist) => {
          if (byPlaylist._id === playlist._id)
            return { ...byPlaylist, isFollowed: isFollowed };
          return byPlaylist;
        });
        const updatedFollowedPlaylists = myFollowingPlaylists.filter(
          (v) => v._id === playlist._id,
        );

        if (!updatedFollowedPlaylists.length)
          setMyFollowingPlaylists((prevSongs) => [...prevSongs, playlist]);

        setUserPlaylists(updatedUserPlaylists);
      } else {
        const updatedFollowedPlaylists = myFollowingPlaylists.filter(
          (pl) => pl._id !== playlist._id,
        );
        const updatedUserPlaylists = userPlaylists.map((byPlaylist) => {
          if (byPlaylist._id === playlist._id)
            return { ...byPlaylist, isFollowed: isFollowed };
          return byPlaylist;
        });
        setMyFollowingPlaylists(updatedFollowedPlaylists);
        setUserPlaylists(updatedUserPlaylists);
      }
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handleAddLikedSongs = (song, liked) => {
    try {
      if (liked) {
        const updatedMyTracks = myTracks.map((byTrack) => {
          if (byTrack._id === song._id) return { ...byTrack, isLiked: liked };
          return byTrack;
        });
        const updatedLikedTracks = userLikedTracks.filter(
          (v) => v._id === song._id,
        );

        if (!updatedLikedTracks.length)
          setUserLikedTracks((prevSongs) => [...prevSongs, song]);

        setMyTracks(updatedMyTracks);
      } else {
        const updatedLikedTracks = userLikedTracks.filter(
          (pl) => pl._id !== song._id,
        );
        const updatedMyTracks = myTracks.map((byTrack) => {
          if (byTrack._id === song._id) return { ...byTrack, isLiked: liked };
          return byTrack;
        });
        setUserLikedTracks(updatedLikedTracks);
        setMyTracks(updatedMyTracks);
      }
    } catch (error) {
      toast(error.message, { type: "error" });
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
    <div className="row gx-4 gy-5">
      {myGenresList.length > 0 && (
        <HomeElement
          label="My genres"
          cols={myGenresList && myFollowings.length > 0 ? "6" : "12"}
          isAnimationContainer
        >
          {myGenresList.map((genre) => (
            <div key={genre} className="mb-2 me-2">
              <GenreCard>{genre.toUpperCase()}</GenreCard>
            </div>
          ))}
        </HomeElement>
      )}
      {myFollowings.length > 0 && (
        <HomeElement
          label="Following users"
          cols={myGenresList && myFollowings.length > 0 ? "6" : "12"}
          isAnimationContainer
        >
          {myFollowings.map((following) => (
            <UserCard key={following._id} userName={following.firstName} />
          ))}
        </HomeElement>
      )}
      {artistsList.length > 0 && (
        <HomeElement label="Artists" isAnimationContainer>
          {artistsList.map((artist) => (
            <ArtistCard
              // classNames=""
              key={artist}
              artistName={artist}
            />
          ))}
        </HomeElement>
      )}
      {userPlaylists.length > 0 && (
        <HomeElement
          label="My playlists"
          to={PUBLIC.MY_PLAYLISTS}
          isAnimationContainer
        >
          {userPlaylists && (
            <PlaylistList
              playlists={userPlaylists}
              onAddFollowedColumn={handleAddFollowingPlaylists}
            />
          )}
        </HomeElement>
      )}
      {myFollowingPlaylists.length > 0 && (
        <HomeElement label="Following playlists" isAnimationContainer>
          {myFollowingPlaylists && (
            <PlaylistList
              playlists={myFollowingPlaylists}
              onAddFollowedColumn={handleAddFollowingPlaylists}
            />
          )}
        </HomeElement>
      )}
      {myTracks.length > 0 && (
        <HomeElement label="My tracks" to={PUBLIC.MY_SONGS}>
          {myTracks && (
            <TrackList
              tracks={myTracks}
              setTracks={setMyTracks}
              onAddLikedColumn={handleAddLikedSongs}
            />
          )}
        </HomeElement>
      )}
      {userLikedTracks.length > 0 && (
        <HomeElement label="Liked songs" to={PUBLIC.MY_SONGS}>
          {userLikedTracks && (
            <TrackList
              tracks={userLikedTracks}
              setTracks={setUserLikedTracks}
              onAddLikedColumn={handleAddLikedSongs}
            />
          )}
        </HomeElement>
      )}
    </div>
  );
}
