import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import { containerAnimation } from "../../utils/motionSettings";

function PlaylistList({
  playlists,
  onAddFollowedColumn = () => {},
  colsMd = "6",
}) {
  const [listOfPlaylists, setListOfPlaylists] = useState(playlists);

  const handleAddFollowedColumn = (playlist, isFollowed) => {
    onAddFollowedColumn(playlist, isFollowed);
  };

  useEffect(() => {
    setListOfPlaylists(playlists);
  }, [playlists]);

  return (
    <motion.div
      className="content d-flex flex-wrap container-fluid row p-0 m-0"
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
          isFollowed={playlist.isFollowed}
          thumbnail={playlist.thumbnail}
          colsMd={colsMd}
          updateFollowedView={handleAddFollowedColumn}
        />
      ))}
    </motion.div>
  );
}

export default PlaylistList;
