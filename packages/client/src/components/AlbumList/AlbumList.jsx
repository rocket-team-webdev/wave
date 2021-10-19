import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { containerAnimation } from "../../utils/motionSettings";
import AlbumCard from "../AlbumCard";

function AlbumList({
  albums,
  onAddLikedColumn = () => {},
  colsMd = "6",
  loadMoreTracks = () => {},
  propPage = 0,
  isSearching,
}) {
  const [listOfAlbums, setListOfAlbums] = useState(albums);
  const [page, setPage] = useState(0);
  const observer = useRef();

  const handleAddLikedColumn = (album, isLiked) => {
    onAddLikedColumn(album, isLiked);
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
      {listOfAlbums.map((album, index) => (
        <React.Fragment
          key={`${
            album.isFollowed ? `${album._id}DivLiked` : `${album._id}Div`
          }`}
        >
          <AlbumCard
            key={album._id}
            albumId={album._id}
            albumTitle={album.title}
            userId={album.userId}
            isLiked={album.isLiked}
            thumbnail={album.thumbnail}
            colsMd={colsMd}
            updateLikedView={handleAddLikedColumn}
          />
          {listOfAlbums.length === index + 1 && <div ref={lastElementRef} />}
        </React.Fragment>
      ))}
    </motion.div>
  );
}

export default AlbumList;
