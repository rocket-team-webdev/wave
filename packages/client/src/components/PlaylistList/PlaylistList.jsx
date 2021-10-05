import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { containerAnimation } from "../../utils/motionSettings";
import PlaylistCard from "../PlaylistCard/PlaylistCard";

function PlaylistList({ playlists, onAddLikedColumn }) {
  const [listOfPlaylists, setListOfPlaylists] = useState(playlists);

  const handleAddLikedColumn = (song, isLiked) => {
    onAddLikedColumn(song, isLiked);
  };

  const handleDeletedView = (trackId) => {
    const updatedListOfPlaylists = listOfPlaylists.filter(
      (v) => v._id !== trackId,
    );
    setListOfPlaylists(updatedListOfPlaylists);
  };

  useEffect(() => {
    setListOfPlaylists(playlists);
  }, [playlists]);

  return (
    <>
      {listOfPlaylists && (
        <motion.div
          // Animation settings
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          {listOfPlaylists.map((playlist) => (
            <PlaylistCard
              key={playlist._id}
              playlistName={playlist.name}
              userId={playlist.userId}
              classNames=""
              updateLikedView={handleAddLikedColumn}
              updateDeletedView={handleDeletedView}
            />
          ))}
        </motion.div>
      )}
    </>
  );
}

export default PlaylistList;
