// import React, { useEffect, useState } from "react";
import React, { useEffect, useState, useRef, useCallback } from "react";
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

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

export default function Tracks() {
  const [uploadedSongs, setUploadedSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const debouncedSearch = useDebounce(searchBar, 500);
  const queueState = useSelector((state) => state.queue);

  const [page, setPage] = useState(0);
  const loader = useRef();

  const fetchUploadedSongs = async () => {
    try {
      const { data } = await getMyTracks();
      setUploadedSongs(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const fetchLikedSongs = async (likePage) => {
    try {
      const { data } = await getLikedTracks(likePage, 8);
      // setLikedSongs((prev) => [...new Set([...prev, ...data.data])]);
      setLikedSongs((prev) => getUniqueListBy([...prev, ...data.data], "_id"));
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

  const fetchTracksData = (fetchPage = 0) => {
    fetchUploadedSongs();
    fetchLikedSongs(fetchPage);
  };

  useEffect(async () => {
    try {
      if (debouncedSearch !== "") {
        const { data } = await searchTrack(debouncedSearch);
        const liked = data.tracks.filter((track) => track.isLiked);
        const uploaded = data.tracks.filter((track) => track.isOwner);

        setUploadedSongs(uploaded);
        setLikedSongs(liked);
      } else {
        setPage(0);
        fetchTracksData();
      }
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

  const lastBookElementRef = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(lastBookElementRef);
    if (loader.current) observer.observe(loader.current);
  }, [lastBookElementRef]);

  useEffect(() => {
    const pageNum = page - 1;
    if (pageNum >= 0) fetchTracksData(pageNum);
  }, [page]);

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
          {uploadedSongs && (
            <>
              <TrackList
                tracks={uploadedSongs}
                setTracks={setUploadedSongs}
                onAddLikedColumn={handleAddLikedColumn}
                setColumnsOnDeleteTrack={handleUpdateColumnsOnDeleteTrack}
                hasSorter
              />
            </>
          )}
        </div>
        <div className="col col-12 col-md-6 pb-5 pb-md-0">
          <div className="fnt-page-title mb-4">Liked</div>
          {likedSongs && (
            <>
              <TrackList
                tracks={likedSongs}
                setTracks={setLikedSongs}
                onAddLikedColumn={handleAddLikedColumn}
                setColumnsOnDeleteTrack={handleUpdateColumnsOnDeleteTrack}
                hasSorter
                loadMoreTracks={fetchTracksData}
              />
              <div ref={loader} />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
