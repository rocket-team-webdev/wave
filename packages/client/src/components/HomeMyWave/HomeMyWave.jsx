import React /* useState, */ /* useEffect */ from "react";
// import { toast } from "react-toastify";

import HomeElement from "../HomeElement";
import Button from "../Button";
import UserCard from "../UserCard";
import ArtistCard from "../ArtistCard";
import PlaylistCard from "../PlaylistCard";

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
  // const loadUserFollowers = async () => {
  //   try {
  //     const { data } = await getUserFollowers();
  //     console.log(data);
  //     // setUserFollowers(???)
  //   } catch (err) {
  //     toast(err.message, { type: "error" });
  //   }
  // };

  // const loadUserFollowing = async () => {
  //   try {
  //     const { data } = await getUserFollowings();
  //     console.log(data);
  //     // setUserFollowings(???)
  //   } catch (err) {
  //     toast(err.message, { type: "error" });
  //   }
  // };

  // // Playlists
  // const loadUserPlaylists = async () => {
  //   try {
  //     const { data } = await getUserPlaylists();
  //     console.log(data);
  //     // setUserPlaylists(data.playlists)
  //   } catch (err) {
  //     toast(err.message, { type: "error" });
  //   }
  // };

  // const loadUserFollowingPlaylists = async () => {
  //   try {
  //     const { data } = await getFollowingPlaylists();
  //     console.log(data);
  //     // setUserFollowingPlaylists(???)
  //   } catch (err) {
  //     toast(err.message, { type: "error" });
  //   }
  // };

  // // Tracks
  // const loadUserTracks = async () => {
  //   try {
  //     const { data } = await getUserTracks();
  //     console.log(data);
  //     // setUserTracks(???)
  //   } catch (err) {
  //     toast(err.message, { type: "error" });
  //   }
  // };

  // const loadUserLikedTracks = async () => {
  //   try {
  //     const { data } = await getUserLikedTracks();
  //     console.log(data);
  //     // setUserLikedTracks(???)
  //   } catch (err) {
  //     toast(err.message, { type: "error" });
  //   }
  // };

  // // On load
  // useEffect(() => {
  //   // Users
  //   loadUserFollowers();
  //   loadUserFollowing();

  //   // Playlists
  //   loadUserPlaylists();
  //   loadUserFollowingPlaylists();

  //   // Tracks
  //   loadUserTracks();
  //   loadUserLikedTracks();
  // }, []);

  const genresList = ["Mathi", "Nacho", "Hugo", "Brahim", "Ernest", "Rick"];
  const followings = ["Mathi", "Nacho", "Hugo", "Brahim", "Ernest", "Rick"];
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
          cols={genresList && followings ? "6" : "12"}
        >
          {genresList.map((genre) => (
            <div key={genre} className="mb-2 me-2">
              <Button isSmall>{genre.toUpperCase()}</Button>
            </div>
          ))}
        </HomeElement>
      )}
      {followings && (
        <HomeElement
          label="Following users"
          cols={genresList && followings ? "6" : "12"}
        >
          {followings.map((following) => (
            <UserCard key={following} userName={following} />
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
        <HomeElement label="My songs">
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
        <HomeElement label="Liked songs">
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
