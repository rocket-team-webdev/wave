import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";

import { PUBLIC } from "../../../constants/routes";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import TrackList from "../../../components/TrackList";

import { getPlaylistById } from "../../../api/playlists-api";

export default function SinglePlaylist() {
  const [playlist, setPlaylist] = useState({});

  const { playlistId } = useRouteMatch(
    `${PUBLIC.SINGLE_PLAYLIST}/:playlistId`,
  ).params;

  const loadPlaylist = async () => {
    try {
      const { data } = await getPlaylistById(playlistId);
      setPlaylist(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  useEffect(() => {
    loadPlaylist();
  }, []);

  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row g-4">
        <div className="col col-12 col-md-6 left-side ps-0">
          <JumboText priText={playlist.name} cols="12" isNegative />
          {/* <div className="d-flex pt-4">
            {playlistGenres &&
              playlistGenres.map((genre) => (
                <div key={genre} className="mb-2 me-2">
                  <Button isSmall>{genre.toUpperCase()}</Button>
                </div>
              ))}
          </div> */}
        </div>
        <div className="col col-12 col-md-6 right-side pe-0">
          <TrackList tracks={playlist.tracks} hasSorter />
        </div>
      </div>
    </Layout>
  );
}
