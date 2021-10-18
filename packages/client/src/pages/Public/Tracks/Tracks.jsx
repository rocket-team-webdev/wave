import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import JumboText from "../../../components/JumboText";
import TrackList from "../../../components/TrackList";
import { getLikedTracks, getMyTracks } from "../../../api/me-api";
import { PUBLIC } from "../../../constants/routes";
import Input from "../../../components/Input";
import { searchTrack } from "../../../api/search-api";
import useDebounce from "../../../hooks/useDebounce";

export default function Tracks() {
  const [uploadedSongs, setUploadedSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const debouncedSearch = useDebounce(searchBar, 500);
  const queueState = useSelector((state) => state.queue);

  const history = useHistory();

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
        const updatedLikedSongs = likedSongs.filter((v) => v._id === song._id);

        if (!updatedLikedSongs.length)
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

  const handleUpdateColumnsOnDeleteTrack = (trackId) => {
    try {
      const updatedLikedSongs = likedSongs.filter((v) => v._id !== trackId);
      const updatedUploadedSongs = uploadedSongs.filter(
        (v) => v._id !== trackId,
      );

      setLikedSongs(updatedLikedSongs);
      setUploadedSongs(updatedUploadedSongs);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
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
    const {
      queue: [track],
    } = queueState;
    const newSong = {
      ...track,
      _id: track?.trackId,
      album: {
        title: track?.album,
        thumbnail: track?.trackImg,
      },
    };

    handleAddLikedColumn(newSong, newSong.isLiked);
  }, [queueState.queue]);

  useEffect(() => {
    fetchUploadedSongs();
    fetchLikedSongs();
  }, []);

  return (
    <Layout isNegative>
      <div className="row mb-3 mb-md-5">
        <div className="col col-12 col-md-9 mb-2 mb-md-0">
          <JumboText priText="My Songs" cols="12" isNegative />
        </div>
        <div className="d-flex justify-content-start justify-content-md-end col col-12 col-md-3 mb-4 mb-md-0">
          <div className="p-0 mt-2">
            <Button
              classNames="me-3"
              isNegative
              secondaryBtn
              handleClick={() => history.goBack()}
            >
              Back
            </Button>
          </div>
          <Link className="float-end py-2" to={PUBLIC.TRACK_UPLOAD}>
            <Button isNegative>Upload Song</Button>
          </Link>
        </div>
        <div className="col-12">
          <form>
            <Input
              id="searchBar"
              name="searchBar"
              type="text"
              placeholder="Search"
              handleChange={handleSearchChange}
              // handleBlur={handleSearchChange}
              value={searchBar}
              classNames="col-12 col-md-6 col-lg-4"
              isNegative
            />
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Uploaded</div>
          {uploadedSongs && (
            <TrackList
              tracks={uploadedSongs}
              setTracks={setUploadedSongs}
              onAddLikedColumn={handleAddLikedColumn}
              setColumnsOnDeleteTrack={handleUpdateColumnsOnDeleteTrack}
              hasSorter
            />
          )}
        </div>
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Liked</div>
          {likedSongs && (
            <TrackList
              tracks={likedSongs}
              setTracks={setLikedSongs}
              onAddLikedColumn={handleAddLikedColumn}
              setColumnsOnDeleteTrack={handleUpdateColumnsOnDeleteTrack}
              hasSorter
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
