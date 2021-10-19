import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import { containerAnimation } from "../../utils/motionSettings";

function PlaylistList({
  playlists,
  onAddFollowedColumn = () => {},
  colsMd = "6",
  loadMoreTracks = () => {},
  propPage = 0,
  isSearching,
}) {
  const [listOfPlaylists, setListOfPlaylists] = useState(playlists);
  const [page, setPage] = useState(0);
  const observer = useRef();

  const handleAddFollowedColumn = (playlist, isFollowed) => {
    onAddFollowedColumn(playlist, isFollowed);
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
    setListOfPlaylists(playlists);
    console.log("Set playlists, ", playlists);
  }, [playlists]);

  return (
    <motion.div
      className="content d-flex flex-wrap container-fluid row p-0 m-0"
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
    >
      {listOfPlaylists.map((playlist, index) => (
        <React.Fragment
          key={`${
            playlist.isFollowed
              ? `${playlist._id}DivFollowed`
              : `${playlist._id}Div`
          }`}
        >
          <PlaylistCard
            key={playlist._id}
            playlistId={playlist._id}
            playlistName={playlist.name}
            userId={playlist.userId}
            isFollowed={playlist.isFollowed}
            thumbnail={playlist.thumbnail}
            bgColor={playlist.primaryColor}
            colsMd={colsMd}
            updateFollowedView={handleAddFollowedColumn}
          />
          {listOfPlaylists.length === index + 1 && <div ref={lastElementRef} />}
        </React.Fragment>
      ))}
    </motion.div>
  );
}

export default PlaylistList;
