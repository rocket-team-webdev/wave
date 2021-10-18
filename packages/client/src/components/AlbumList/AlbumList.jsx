import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { containerAnimation } from "../../utils/motionSettings";
import AlbumCard from "../AlbumCard";

function AlbumList({ albums, onAddLikedColumn = () => {}, colsMd = "6" }) {
  const [listOfAlbums, setListOfAlbums] = useState(albums);

  const handleAddLikedColumn = (album, isLiked) => {
    onAddLikedColumn(album, isLiked);
  };

  useEffect(() => {
    setListOfAlbums(albums);
  }, [albums]);

  return (
    <motion.div
      className="content d-flex flex-wrap container-fluid row p-0 m-0"
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
    >
      {listOfAlbums.map((album) => (
        <AlbumCard
          key={album._id}
          albumId={album._id}
          albumTitle={album.title}
          userId={album.userId}
          isLiked={album.isLiked}
          colsMd={colsMd}
          updateLikedView={handleAddLikedColumn}
        />
      ))}
    </motion.div>
  );
}

export default AlbumList;
