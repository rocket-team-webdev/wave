import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { sortArrayAscendent, sortArrayDescendent } from "../../utils/sorters";
import { containerAnimation } from "../../utils/motionSettings";
import TrackCard from "../TrackCard";
import TrackSorter from "../TrackSorter/TrackSorter";
import { updatePlaylistOrder } from "../../api/playlists-api";

import { setQueue } from "../../redux/music-queue/actions";

function TrackList({
  tracks,
  setTracks,
  onAddLikedColumn = () => {},
  setColumnsOnDeleteTrack = () => {},
  loadMoreTracks = () => {},
  propPage = 0,
  isSearching,
  hasSorter,
  isOnPlaylist = false,
  isOnQueue = false,
}) {
  const flagInitialState = {
    flagTitle: "titleDesc",
    flagAlbum: "albumDesc",
    flagPopularity: "popDesc",
    flagDuration: "durDesc",
  };
  const [flag, setFlag] = useState(flagInitialState);

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const observer = useRef();

  const handleAddLikedColumn = (song, isLiked) => {
    onAddLikedColumn(song, isLiked);
  };

  const handleDeletedView = (trackId) => {
    const updatedListOfTracks = tracks.filter((v) => v._id !== trackId);
    setTracks(updatedListOfTracks);

    // update liked and uploaded columns
    setColumnsOnDeleteTrack(trackId);
  };

  const updateQueue = (tracksUpdated) => {
    const tracksArray = [];
    tracksUpdated.forEach((track) => {
      const trackObject = {
        name: track.name,
        url: track.url,
        duration: track.duration,
        genreId: track.genreId,
        artist: track.artist,
        album: track.album.title,
        isLiked: track.isLiked,
        trackId: track._id,
        albumId: track.album._id,
        trackImg: track.album.thumbnail,
      };
      tracksArray.push(trackObject);
    });
    dispatch(setQueue(tracksArray));
  };

  const sortByTitleAndArtist = () => {
    let sortedTracks = [];
    switch (flag.flagTitle) {
      case "none":
        setTracks(tracks);
        if (isOnQueue) updateQueue(tracks);
        setFlag(flagInitialState);
        break;
      case "titleDesc":
        sortedTracks = sortArrayDescendent(tracks, "name");
        setTracks(sortedTracks);
        if (isOnQueue) updateQueue(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagTitle: "titleAsc",
        });
        break;
      case "titleAsc":
        sortedTracks = sortArrayAscendent(tracks, "name");
        setTracks(sortedTracks);
        if (isOnQueue) updateQueue(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagTitle: "artistDesc",
        });
        break;
      case "artistDesc":
        sortedTracks = sortArrayDescendent(tracks, "artist");
        setTracks(sortedTracks);
        if (isOnQueue) updateQueue(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagTitle: "artistAsc",
        });
        break;
      case "artistAsc":
        sortedTracks = sortArrayAscendent(tracks, "artist");
        setTracks(sortedTracks);
        if (isOnQueue) updateQueue(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagTitle: "none",
        });
        break;
      default:
        setTracks(tracks);
        if (isOnQueue) updateQueue(tracks);
    }
  };

  const sortByAlbum = () => {
    let sortedTracks = [];
    switch (flag.flagAlbum) {
      case "none":
        setTracks(tracks);
        if (isOnQueue) updateQueue(tracks);
        setFlag(flagInitialState);
        break;
      case "albumDesc":
        sortedTracks = sortArrayAscendent(tracks, "album", "title");
        setTracks(sortedTracks);
        if (isOnQueue) updateQueue(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagAlbum: "albumAsc",
        });
        break;
      case "albumAsc":
        sortedTracks = sortArrayDescendent(tracks, "album", "title");
        setTracks(sortedTracks);
        if (isOnQueue) updateQueue(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagAlbum: "none",
        });
        break;
      default:
        setTracks(tracks);
        if (isOnQueue) updateQueue(tracks);
    }
  };

  const sortByPopularity = () => {
    let sortedTracks = [];
    switch (flag.flagPopularity) {
      case "none":
        setTracks(tracks);
        if (isOnQueue) updateQueue(tracks);
        setFlag(flagInitialState);
        break;
      case "popDesc":
        sortedTracks = sortArrayDescendent(tracks, "popularity");
        setTracks(sortedTracks);
        if (isOnQueue) updateQueue(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagPopularity: "popAsc",
        });
        break;
      case "popAsc":
        sortedTracks = sortArrayAscendent(tracks, "popularity");
        setTracks(sortedTracks);
        if (isOnQueue) updateQueue(sortedTracks);
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
        if (isOnQueue) updateQueue(tracks);
        setFlag(flagInitialState);
        break;
      case "durDesc":
        sortedTracks = sortArrayDescendent(tracks, "duration");
        setTracks(sortedTracks);
        if (isOnQueue) updateQueue(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagDuration: "durAsc",
        });
        break;
      case "durAsc":
        sortedTracks = sortArrayAscendent(tracks, "duration");
        setTracks(sortedTracks);
        if (isOnQueue) updateQueue(sortedTracks);
        setFlag({
          ...flagInitialState,
          flagDuration: "none",
        });
        break;
      default:
        setTracks(tracks);
    }
  };

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
    if (isOnQueue) updateQueue(items);
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

  const lastElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    if (!isSearching) {
      loadMoreTracks(page);
    }
  }, [page]);

  useEffect(() => {
    if (propPage === 0) setPage(propPage);
  }, [propPage]);

  return (
    <div className="w-100">
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
                    <React.Fragment
                      key={`${
                        song.isLiked ? `${song._id}DivLike` : `${song._id}Div`
                      }`}
                    >
                      <TrackCard
                        // eslint-disable-next-line react/no-array-index-key
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
                        popularity={song.popularity}
                        updateLikedView={handleAddLikedColumn}
                        updateDeletedView={handleDeletedView}
                        draggable={hasSorter}
                        isOnPlaylist={isOnPlaylist}
                        isOnQueue={isOnQueue}
                      />
                      {tracks.length === index + 1 && (
                        <div ref={lastElementRef} />
                      )}
                    </React.Fragment>
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
