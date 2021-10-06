import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import { containerAnimation } from "../../utils/motionSettings";

function PlaylistList({ playlists /* onAddLikedColumn */ }) {
  const [listOfPlaylists, setListOfPlaylists] = useState(playlists);

  // const handleAddLikedColumn = (song, isLiked) => {
  //   onAddLikedColumn(song, isLiked);
  // };

  // const handleDeletedView = (trackId) => {
  //   const updatedListOfPlaylists = listOfPlaylists.filter(
  //     (v) => v._id !== trackId,
  //   );
  //   setListOfPlaylists(updatedListOfPlaylists);
  // };

  useEffect(() => {
    setListOfPlaylists(playlists);
  }, [playlists]);

  return (
    <motion.div
      className="content d-flex flex-wrap row"
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
    >
      {listOfPlaylists.map((playlist) => (
        <PlaylistCard
          key={playlist._id}
          playlistId={playlist._id}
          playlistName={playlist.name}
          userId={playlist.userId}
          colsMd="6"
          // updateLikedView={handleAddLikedColumn}
          // updateDeletedView={handleDeletedView}
        />
      ))}
    </motion.div>
  );
}

export default PlaylistList;
