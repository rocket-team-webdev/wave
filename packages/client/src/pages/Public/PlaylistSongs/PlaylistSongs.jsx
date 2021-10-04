import React from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Layout from "../../../components/Layout";
import JumboText from "../../../components/JumboText";
import TrackCard from "../../../components/TrackCard";
import Button from "../../../components/Button";

export default function PlaylistSongs() {
  const playlistTitle = "Test asdfasdfasdf";
  const playlistGenres = ["Genre1", "Genre2", "Genre3"];
  const playlistTracks = [
    "track1",
    "track2",
    "track3",
    "track4",
    "track5",
    "track6",
    "track7",
    "track8",
    "track9",
    "track10",
    "track11",
    "track12",
    "track13",
    "track14",
    "track15",
  ];

  return (
    <Layout isNegative>
      <div className="d-flex justify-content-between align-items-start row g-4">
        <div className="col col-12 col-md-6 left-side ps-0">
          <JumboText priText={playlistTitle} cols="12" isNegative />
          <div className="d-flex pt-4">
            {playlistGenres &&
              playlistGenres.map((genre) => (
                <div key={genre} className="mb-2 me-2">
                  <Button isSmall>{genre.toUpperCase()}</Button>
                </div>
              ))}
          </div>
        </div>
        <div className="col col-12 col-md-6 right-side pe-0">
          <div className="border border-1">Playlist song order component</div>
          {playlistTracks.length > 0 && (
            <DragDropContext onDragEnd={() => {}}>
              <Droppable droppableId="playlistTracks">
                {(provided) => (
                  <div
                    className="col col-12 "
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {playlistTracks &&
                      playlistTracks.map((song, index) => (
                        <TrackCard
                          key={song._id}
                          trackNumber={index + 1}
                          trackName="name"
                          trackImg="thumbnail"
                          artist="artist"
                          albumName="album"
                          time="0:00"
                          // trackUrl={song.url}
                          // albumId={song.album._id}
                          // genreId={song.genreId}
                          // isLiked={song.isLiked}
                          // trackId={song._id}
                          // userId={song.userId}
                          index={index}
                          draggable={false}
                        />
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
    </Layout>
  );
}
