import React, { useState } from "react";
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

  return (
    <>
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
    </>
  );
}

export default TrackList;
