import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { PUBLIC } from "../../constants/routes";

import HomeElement from "../HomeElement";
import Button from "../Button";
import UserCard from "../UserCard";
import ArtistCard from "../ArtistCard";
import PlaylistCard from "../PlaylistCard";
import TrackCard from "../TrackCard";
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
    <div className="row gx-4 gy-5">
      {myGenresList && (
        <HomeElement
          label="My genres"
          cols={myGenresList && myFollowings.length > 0 ? "6" : "12"}
        >
          {myGenresList.map((genre) => (
            <div key={genre} className="mb-2 me-2">
              <Button isSmall>{genre.toUpperCase()}</Button>
            </div>
          ))}
        </HomeElement>
      )}
      {myFollowings.length > 0 && (
        <HomeElement
          label="Following users"
          cols={myGenresList && myFollowings.length > 0 ? "6" : "12"}
        >
          {myFollowings.map((following) => (
            <UserCard key={following._id} userName={following.firstName} />
          ))}
        </HomeElement>
      )}
      {artistsList.length > 0 && (
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
      {userPlaylists.length > 0 && (
        <HomeElement label="My playlists">
          {userPlaylists.map((playlist) => (
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
      {myFollowingPlaylists.length > 0 && (
        <HomeElement label="Following playlists">
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
      {myTracks.length > 0 && (
        <HomeElement label="My tracks" to={PUBLIC.MY_SONGS}>
          <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="myTracks">
              {(provided) => (
                <div
                  className="col col-12 "
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {myTracks &&
                    myTracks.map((song, index) => (
                      <TrackCard
                        key={song._id}
                        trackNumber={index + 1}
                        trackName={song.name}
                        trackImg={song.album.thumbnail}
                        artist={song.artist}
                        albumName={song.album.title}
                        time={song.duration}
                        trackUrl={song.url}
                        albumId={song.album._id}
                        genreId={song.genreId}
                        isLiked={song.isLiked}
                        trackId={song._id}
                        userId={song.userId}
                        index={index}
                        draggable={false}
                        // updateLikedView={handleAddLikedColumn}
                        // updateDeletedView={handleDeletedView}
                      />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </HomeElement>
      )}
      {userLikedTracks.length > 0 && (
        <HomeElement label="Liked songs" to={PUBLIC.MY_SONGS}>
          <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="userLikedTracks">
              {(provided) => (
                <div
                  className="col col-12 "
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {userLikedTracks &&
                    userLikedTracks.map((song, index) => (
                      <TrackCard
                        key={song._id}
                        trackNumber={index + 1}
                        trackName={song.name}
                        trackImg={song.album.thumbnail}
                        artist={song.artist}
                        albumName={song.album.title}
                        time={song.duration}
                        trackUrl={song.url}
                        albumId={song.album._id}
                        genreId={song.genreId}
                        isLiked={song.isLiked}
                        trackId={song._id}
                        userId={song.userId}
                        index={index}
                        draggable={false}
                        // updateLikedView={handleAddLikedColumn}
                        // updateDeletedView={handleDeletedView}
                      />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </HomeElement>
      )}
    </div>
  );
}
