import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [loaded, setLoaded] = useState(false);
  const [searchBar, setSearchBar] = useState("");
  const debouncedSearch = useDebounce(searchBar, 500);
  const queueState = useSelector((state) => state.queue);

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
    setLoaded(false);
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
        setLoaded(true);
      } else {
        const updatedLikedSongs = likedSongs.filter((v) => v._id !== song._id);
        const updatedUploadedSongs = uploadedSongs.map((bySong) => {
          if (bySong._id === song._id) return { ...bySong, isLiked: liked };
          return bySong;
        });
        setLikedSongs(updatedLikedSongs);
        setUploadedSongs(updatedUploadedSongs);
        setLoaded(true);
      }
    } catch (error) {
      toast(error.message, { type: "error" });
      setLoaded(true);
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
    const newSong = {
      ...queueState.queue[0],
      _id: queueState.queue[0]?.trackId,
      album: {
        title: queueState.queue[0]?.album,
        thumbnail: queueState.queue[0]?.trackImg,
      },
    };

    handleAddLikedColumn(newSong, newSong.isLiked);
  }, [queueState.queue]);

  useEffect(() => {
    fetchUploadedSongs();
    fetchLikedSongs();
    setLoaded(true);
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
              classNames="col-12 col-md-6 col-lg-4"
              isNegative
            />
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Uploaded</div>
          {loaded && uploadedSongs && (
            <TrackList
              tracks={uploadedSongs}
              onAddLikedColumn={handleAddLikedColumn}
            />
          )}
        </div>
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Liked</div>
          {loaded && likedSongs && (
            <TrackList
              tracks={likedSongs}
              onAddLikedColumn={handleAddLikedColumn}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
