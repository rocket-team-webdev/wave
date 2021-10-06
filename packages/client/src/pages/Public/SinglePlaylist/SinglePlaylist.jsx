import React from "react";

// import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
// import TrackCard from "../../../components/TrackCard";
import Button from "../../../components/Button";
// import TrackList from "../../../components/TrackList";

export default function SinglePlaylist() {
  // const [playlistTracks, setPlaylistTracks] = useState([]);

  const playlistTitle = "Test asdfasdfasdf";
  const playlistGenres = ["Genre1", "Genre2", "Genre3"];

  // const loadPlaylistTracks = async () => {
  //   try {
  //     const { data } = await getPlaylistById();
  //     setPlaylistTracks();
  //   } catch (error) {
  //     toast(error.message, { type: "error" });
  //   }
  // };

  // useEffect(() => {
  //   loadPlaylistTracks();
  // }, []);

  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row g-4">
        <div className="col col-12 col-md-6 left-side ps-0">
          <JumboText priText={playlistTitle} cols="12" isNegative />
          <div className="d-flex pt-4">
            {playlistGenres &&
              playlistGenres.map((genre) => (
                <div key={genre} className="mb-2 me-2">
                  <Button isSmall>{genre.toUpperCase()}</Button>
                </div>
              ))}
          </div>
        </div>
        <div className="col col-12 col-md-6 right-side pe-0">
          {/* <TrackList tracks={playlistTracks} hasSorter /> */}
        </div>
      </div>
    </Layout>
  );
}
