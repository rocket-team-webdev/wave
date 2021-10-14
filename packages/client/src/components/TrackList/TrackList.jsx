import React, { /* useEffect,  */ useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { sortArrayAscendent, sortArrayDescendent } from "../../utils/sorters";
import { containerAnimation } from "../../utils/motionSettings";
import TrackCard from "../TrackCard";
import TrackSorter from "../TrackSorter/TrackSorter";
import { updatePlaylistOrder } from "../../api/playlists-api";

function TrackList({
  tracks,
  setTracks,
  onAddLikedColumn = () => {},
  hasSorter,
  isOnPlaylist = false,
}) {
  const flagInitialState = {
    flagTitle: "titleDesc",
    flagAlbum: "albumDesc",
    flagPopularity: "popDesc",
    flagDuration: "durDesc",
  };
  const [flag, setFlag] = useState(flagInitialState);

  const handleAddLikedColumn = (song, isLiked) => {
    onAddLikedColumn(song, isLiked);
  };

  const handleDeletedView = (trackId) => {
    const updatedListOfTracks = tracks.filter((v) => v._id !== trackId);
    setTracks(updatedListOfTracks);
  };

  const sortByTitleAndArtist = () => {
    let sortedTracks = [];
    switch (flag.flagTitle) {
      case "none":
        setTracks(tracks);
        setFlag(flagInitialState);
        break;
      case "titleDesc":
        sortedTracks = sortArrayDescendent(tracks, "name");
        setTracks(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagTitle: "titleAsc",
        });
        break;
      case "titleAsc":
        sortedTracks = sortArrayAscendent(tracks, "name");
        setTracks(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagTitle: "artistDesc",
        });
        break;
      case "artistDesc":
        sortedTracks = sortArrayDescendent(tracks, "artist");
        setTracks(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagTitle: "artistAsc",
        });
        break;
      case "artistAsc":
        sortedTracks = sortArrayAscendent(tracks, "artist");
        setTracks(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagTitle: "none",
        });
        break;
      default:
        setTracks(tracks);
    }
  };

  const sortByAlbum = () => {
    let sortedTracks = [];
    switch (flag.flagAlbum) {
      case "none":
        setTracks(tracks);
        setFlag(flagInitialState);
        break;
      case "albumDesc":
        sortedTracks = sortArrayAscendent(tracks, "album", "title");
        setTracks(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagAlbum: "albumAsc",
        });
        break;
      case "albumAsc":
        sortedTracks = sortArrayDescendent(tracks, "album", "title");
        setTracks(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagAlbum: "none",
        });
        break;
      default:
        setTracks(tracks);
    }
  };

  const sortByPopularity = () => {
    let sortedTracks = [];
    switch (flag.flagPopularity) {
      case "none":
        setTracks(tracks);
        setFlag(flagInitialState);
        break;
      case "popDesc":
        sortedTracks = sortArrayDescendent(tracks, "popularity");
        setTracks(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagPopularity: "popAsc",
        });
        break;
      case "popAsc":
        sortedTracks = sortArrayAscendent(tracks, "popularity");
        setTracks(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagPopularity: "none",
        });
        break;
      default:
        setTracks(tracks);
    }
  };

  const sortByDuration = () => {
    let sortedTracks = [];
    switch (flag.flagDuration) {
      case "none":
        setTracks(tracks);
        setFlag(flagInitialState);
        break;
      case "durDesc":
        sortedTracks = sortArrayDescendent(tracks, "duration");
        setTracks(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagDuration: "durAsc",
        });
        break;
      case "durAsc":
        sortedTracks = sortArrayAscendent(tracks, "duration");
        setTracks(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagDuration: "none",
        });
        break;
      default:
        setTracks(tracks);
    }
  };

  // useEffect(() => {
  //   setTracks(tracks);
  // }, [tracks]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEndUploaded = async (res) => {
    const { destination, source } = res;

    if (!destination) return;

    const items = reorder(tracks, source.index, destination.index);
    setTracks(items);
    await updatePlaylistOrder({
      source: {
        index: source.index,
        trackId: tracks[source.index]?._id,
      },
      destination: {
        index: destination.index,
        trackId: tracks[destination.index]?._id,
      },
      playlistId: isOnPlaylist?._id,
    });
  };

  return (
    <div className="mw-100">
      <DragDropContext onDragEnd={onDragEndUploaded}>
        <Droppable droppableId="Uploaded">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {hasSorter && (
                <TrackSorter
                  sortByTitleAndArtist={sortByTitleAndArtist}
                  sortByAlbum={sortByAlbum}
                  sortByPopularity={sortByPopularity}
                  sortByDuration={sortByDuration}
                />
              )}

              {tracks && (
                <motion.div
                  // Animation settings
                  variants={containerAnimation}
                  initial="hidden"
                  animate="visible"
                >
                  {tracks.map((song, index) => (
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
                      playCounter={song.popularity}
                      updateLikedView={handleAddLikedColumn}
                      updateDeletedView={handleDeletedView}
                      draggable={hasSorter}
                      isOnPlaylist={isOnPlaylist}
                    />
                  ))}
                </motion.div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TrackList;
