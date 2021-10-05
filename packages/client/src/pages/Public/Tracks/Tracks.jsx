import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import JumboText from "../../../components/JumboText";
import TrackCard from "../../../components/TrackCard";
import { getLikedTracks, getMyTracks } from "../../../api/me-api";
import { PUBLIC } from "../../../constants/routes";
import Input from "../../../components/Input";
import { searchTrack } from "../../../api/search-api";
import useDebounce from "../../../hooks/useDebounce";

export default function Tracks() {
  const [uploadedSongs, setUploadedSongs] = useState();
  const [likedSongs, setLikedSongs] = useState();
  const [searchBar, setSearchBar] = useState("");
  const debouncedSearch = useDebounce(searchBar, 500);

  const fetchUploadedSongs = async () => {
    try {
      const { data } = await getMyTracks();
      setUploadedSongs(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const fetchLikedSongs = async () => {
    try {
      const { data } = await getLikedTracks();
      setLikedSongs(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handleAddLikedColumn = (song, liked) => {
    try {
      if (liked) {
        const updatedUploadedSongs = uploadedSongs.map((bySong) => {
          if (bySong._id === song._id) return { ...bySong, isLiked: liked };
          return bySong;
        });
        setLikedSongs((prevSongs) => [...prevSongs, song]);
        setUploadedSongs(updatedUploadedSongs);
      } else {
        const updatedLikedSongs = likedSongs.filter((v) => v._id !== song._id);
        const updatedUploadedSongs = uploadedSongs.map((bySong) => {
          if (bySong._id === song._id) return { ...bySong, isLiked: liked };
          return bySong;
        });
        setLikedSongs(updatedLikedSongs);
        setUploadedSongs(updatedUploadedSongs);
      }
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handleDeletedView = (trackId) => {
    const updatedLikedSongs = likedSongs.filter((v) => v._id !== trackId);
    const updatedUploadedSongs = uploadedSongs.filter((v) => v._id !== trackId);
    setLikedSongs(updatedLikedSongs);
    setUploadedSongs(updatedUploadedSongs);
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

    const items = reorder(uploadedSongs, source.index, destination.index);
    setUploadedSongs(items);
  };

  const onDragEndLiked = (res) => {
    const { destination, source } = res;

    if (!destination) return;

    const items = reorder(likedSongs, source.index, destination.index);
    setLikedSongs(items);
  };

  const handleSearchChange = async (e) => {
    setSearchBar(e.target.value);
  };

  useEffect(async () => {
    try {
      const { data } = await searchTrack(debouncedSearch);
      const liked = data.tracks.filter((track) => track.isLiked);
      const uploaded = data.tracks.filter((track) => track.isOwner);

      setUploadedSongs(uploaded);
      setLikedSongs(liked);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchUploadedSongs();
    fetchLikedSongs();
  }, []);

  return (
    <Layout isNegative>
      <div className="row mb-5">
        <div className="col col-9">
          <JumboText priText="My Songs" cols="12" isNegative />
        </div>
        <div className="col col-3">
          <Link className="float-end p-3" to={PUBLIC.TRACK_UPLOAD}>
            <Button isNegative>Upload</Button>
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <form className="">
            <Input
              id="searchBar"
              name="searchBar"
              type="text"
              placeholder="Search"
              handleChange={handleSearchChange}
              // handleBlur={handleSearchChange}
              value={searchBar}
              classNames="ms-auto col-12 col-md-6 col-lg-4"
              isNegative
            />
          </form>
        </div>
        <DragDropContext onDragEnd={onDragEndUploaded}>
          <Droppable droppableId="Uploaded">
            {(provided) => (
              <div
                className="col col-12 col-md-6 pb-5 pb-md-0"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="fnt-page-title mb-4">Uploaded</div>
                {uploadedSongs &&
                  uploadedSongs.map((song, index) => (
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
                      draggable
                      updateLikedView={handleAddLikedColumn}
                      updateDeletedView={handleDeletedView}
                    />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <DragDropContext onDragEnd={onDragEndLiked}>
          <Droppable droppableId="liked">
            {(provided) => (
              <div
                className="col col-12 col-md-6"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="fnt-page-title mb-4">Liked</div>
                {likedSongs &&
                  likedSongs.map((song, index) => (
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
                      draggable
                      updateLikedView={handleAddLikedColumn}
                      updateDeletedView={handleDeletedView}
                    />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </Layout>
  );
}
