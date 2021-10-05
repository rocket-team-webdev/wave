import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sortArrayDescendent } from "../../helpers/helpers";
import TrackCard from "../TrackCard";
import TrackSorter from "../TrackSorter/TrackSorter";

function TrackList({ tracks, onAddLikedColumn }) {
  const [listOfTracks, setListOfTracks] = useState(tracks);

  const handleAddLikedColumn = (song, isLiked) => {
    onAddLikedColumn(song, isLiked);
  };

  const handleDeletedView = (trackId) => {
    const updatedListOfTracks = listOfTracks.filter((v) => v._id !== trackId);
    setListOfTracks(updatedListOfTracks);
  };

  const handleSortByTitleAndArtist = () => {
    const sortedTracks = sortArrayDescendent(listOfTracks, "name");
    setListOfTracks(sortedTracks);
  };

  const handleSortByAlbum = () => {
    const sortedTracks = sortArrayDescendent(listOfTracks, "album", "title");
    setListOfTracks(sortedTracks);
  };

  const handleSortByPopularity = () => {
    const sortedTracks = sortArrayDescendent(listOfTracks, "popularity");
    setListOfTracks(sortedTracks);
  };

  const handleSortByDuration = () => {
    const sortedTracks = sortArrayDescendent(listOfTracks, "duration");
    setListOfTracks(sortedTracks);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEndUploaded = (res) => {
    const { destination, source } = res;

    if (!destination) return;

    const items = reorder(listOfTracks, source.index, destination.index);
    setListOfTracks(items);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEndUploaded}>
        <Droppable droppableId="Uploaded">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <TrackSorter
                sortByTitleAndArtist={handleSortByTitleAndArtist}
                sortByAlbum={handleSortByAlbum}
                sortByPopularity={handleSortByPopularity}
                sortByDuration={handleSortByDuration}
              />
              {listOfTracks &&
                listOfTracks.map((song, index) => (
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
                    // draggable
                    updateLikedView={handleAddLikedColumn}
                    updateDeletedView={handleDeletedView}
                  />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default TrackList;
