import React, { /* useState */ useEffect } from "react";

import Layout from "../../../components/Layout";
import HomeElement from "../../../components/HomeElement";
import PlaylistCard from "../../../components/PlaylistCard";
import GenreCard from "../../../components/GenreCard";
// import TrackCard from "../../../components/TrackCard";

export default function UserView() {
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [userFollowers, setUserFollowers] = useState([]);
  //   const [userFollowings, setUserFollowings] = useState([]);
  //   const [userPlaylists, setUserPlaylists] = useState([]);
  //   const [userAlbums, setUserAlbums] = useState([]);
  //   const [userUploadedTracks, setUserUploadedTracks] = useState([]);
  //   const [userLikedTracks, setUserLikedTracks] = useState([]);

  const userGenresList = ["Mathi", "Nacho", "Hugo", "Brahim", "Ernest", "Rick"];

  const userPlaylists = ["userPlaylist1", "userPlaylist1"];
  const userAlbums = ["userAlbum1", "userAlbum1"];
  //   const userUploadedTrack = [
  //     "uploadedTrack",
  //     "uploadedTrack",
  //     "uploadedTrack",
  //     "uploadedTrack",
  //     "uploadedTrack",
  //   ];

  useEffect(() => {
    console.log("useEffect executed");
  }, []);
  return (
    <Layout isNegative>
      <div className="row p-0 g-4">
        {/* Left side */}
        <div className="col col-12 col-md-10 ps-0">
          {/* Username */}
          <h1 className="fnt-page-title mb-5">{"Username".toUpperCase()}</h1>
          <div className="row mb-5">
            {/* Playlists */}
            {userPlaylists.length > 0 && (
              <HomeElement label="Playlists" cols="6" isAnimationContainer>
                {userPlaylists.map((playlist) => (
                  <PlaylistCard
                    key={playlist}
                    //   playListId={playlist._id}
                    playlistName={playlist}
                    //   userId={playlist.userId}
                    // classNames=""
                  />
                ))}
              </HomeElement>
            )}
            {/* Albums */}
            {userAlbums.length > 0 && (
              <HomeElement label="Albums" cols="6" isAnimationContainer>
                {userAlbums.map((album) => (
                  <PlaylistCard
                    key={album}
                    //   playListId={playlist._id}
                    playlistName={album}
                    //   userId={playlist.userId}
                    // classNames=""
                  />
                ))}
              </HomeElement>
            )}
          </div>
        </div>
        {/* Right side */}
        <div className="col col-12 col-md-2 pe-0">
          {userGenresList.length > 0 && (
            <HomeElement label="My genres" isAnimationContainer>
              {userGenresList.map((genre) => (
                <div key={genre} className="mb-2 me-2">
                  <GenreCard>{genre.toUpperCase()}</GenreCard>
                </div>
              ))}
            </HomeElement>
          )}
        </div>
      </div>
    </Layout>
  );
}
