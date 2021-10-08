import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { sortArrayAscendent, sortArrayDescendent } from "../../utils/sorters";
import { containerAnimation } from "../../utils/motionSettings";
import TrackCard from "../TrackCard";
import TrackSorter from "../TrackSorter/TrackSorter";

function TrackList({
  tracks,
  setTracks,
  onAddLikedColumn = () => {},
  hasSorter,
  isOnPlaylist = false,
}) {
  const [flag, setFlag] = useState({
    flagTitle: 1,
    flagAlbum: 1,
    flagPopularity: 1,
    flagDuration: 1,
  });

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
      case 0:
        setTracks(tracks);
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 1:
        sortedTracks = sortArrayDescendent(tracks, "name");
        setTracks(sortedTracks);
        setFlag({
          flagTitle: 2,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 2:
        sortedTracks = sortArrayAscendent(tracks, "name");
        setTracks(sortedTracks);
        setFlag({
          flagTitle: 3,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 3:
        sortedTracks = sortArrayDescendent(tracks, "artist");
        setTracks(sortedTracks);
        setFlag({
          flagTitle: 4,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 4:
        sortedTracks = sortArrayAscendent(tracks, "artist");
        setTracks(sortedTracks);
        setFlag({
          flagTitle: 0,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      default:
        setTracks(tracks);
    }
  };

  const sortByAlbum = () => {
    let sortedTracks = [];
    switch (flag.flagAlbum) {
      case 0:
        setTracks(tracks);
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 1:
        sortedTracks = sortArrayAscendent(tracks, "album", "title");
        setTracks(sortedTracks);
        setFlag({
          flagTitle: 1,
          flagAlbum: 2,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 2:
        sortedTracks = sortArrayDescendent(tracks, "album", "title");
        setTracks(sortedTracks);
        setFlag({
          flagTitle: 1,
          flagAlbum: 0,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      default:
        setTracks(tracks);
    }
  };

  const sortByPopularity = () => {
    let sortedTracks = [];
    switch (flag.flagPopularity) {
      case 0:
        setTracks(tracks);
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 1:
        sortedTracks = sortArrayDescendent(tracks, "popularity");
        setTracks(sortedTracks);
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 2,
          flagDuration: 1,
        });
        break;
      case 2:
        sortedTracks = sortArrayAscendent(tracks, "popularity");
        setTracks(sortedTracks);
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 0,
          flagDuration: 1,
        });
        break;
      default:
        setTracks(tracks);
    }
  };

  const sortByDuration = () => {
    let sortedTracks = [];
    switch (flag.flagDuration) {
      case 0:
        setTracks(tracks);
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 1,
        });
        break;
      case 1:
        sortedTracks = sortArrayDescendent(tracks, "duration");
        setTracks(sortedTracks);
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 2,
        });
        break;
      case 2:
        sortedTracks = sortArrayAscendent(tracks, "duration");
        setTracks(sortedTracks);
        setFlag({
          flagTitle: 1,
          flagAlbum: 1,
          flagPopularity: 1,
          flagDuration: 0,
        });
        break;
      default:
        setTracks(tracks);
    }
  };

  useEffect(() => {
    setTracks(tracks);
  }, [tracks]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEndUploaded = (res) => {
    const { destination, source } = res;

    if (!destination) return;

    const items = reorder(tracks, source.index, destination.index);
    setTracks(items);
  };

  return (
    <>
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
    </>
  );
}

export default TrackList;
