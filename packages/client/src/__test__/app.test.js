/* eslint-disable jest/no-disabled-tests */
import userEvent from "@testing-library/user-event";
import React from "react";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import "../__mocks__/intersectionObserverMock";

import axios from "axios";

import { render, screen, waitFor, cleanup } from "../utils/test-utils";
import "@testing-library/jest-dom";

import RouterComponent from "../components/Router";

jest.mock("firebase/compat/app", () => {
  return {
    auth: jest.fn(() => {
      return {
        onAuthStateChanged: jest.fn(),
      };
    }),
    apps: [],
    initializeApp: jest.fn(),
  };
});

jest.mock("id3js/lib/id3", () => {
  return { fromFile: jest.fn() };
});

// window.IntersectionObserver = jest.fn(() => ({
//   observe: jest.fn(),
//   unobserve: jest.fn(),
// }));

// const mock = function () {
//   return {
//     observe: jest.fn(),
//     disconnect: jest.fn(),
//   };
// };

// window.IntersectionObserver = mock;

const tracksData = [
  {
    popularity: 0,
    _id: "615478ce075f352c9f91f69b",
    name: "The big building",
    artist: "Bensound",
    url: "https://res.cloudinary.com/dz5nspe7f/video/upload/v1632147266/music-uploads/bensound-happyrock_bg3hh6.mp3",
    duration: 180,
    genreId: "6154269e1755f546b465a650",
    userId: "61542b5bd2fd325bfcb42a7d",
    album: {
      _id: "6156f57a87ccf70e9023b03c",
      thumbnail:
        "https://res.cloudinary.com/dz5nspe7f/image/upload/v1633088890/covers-preset/x5vy3gdag6wa5qkweera.jpg",
      title: "Mathias' Album",
    },
    likes: 2,
    isLiked: false,
  },
  {
    popularity: 0,
    _id: "6154862ab51025e9d25f5795",
    name: "Song 3",
    artist: "Bensound",
    url: "https://res.cloudinary.com/dz5nspe7f/video/upload/v1632147266/music-uploads/bensound-happyrock_bg3hh6.mp3",
    duration: 180,
    genreId: "6154269e1755f546b465a650",
    userId: "6154269e1755f546b465a648",
    album: {
      _id: "6154269e1755f546b465a65b",
      title: "Album 1",
      thumbnail:
        "https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=906&q=80",
    },
    likes: 1,
    isLiked: false,
  },
];

const playlistData = [
  {
    _id: "615c345b11399a28c8fb0d90",
    name: "O-A-S-I-S!",
    userId: "61556affd0b9691c9d0fd089",
    thumbnail:
      "https://images.unsplash.com/photo-1632993952737-0c2897164db3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    primaryColor: "#2c19b8",
    follows: 3,
    isFollowed: true,
  },
  {
    _id: "615d6e26ae59c26c7027031f",
    thumbnail:
      "https://res.cloudinary.com/dz5nspe7f/image/upload/v1633512996/covers-preset/akibwr7txywoegx4ofx4.jpg",
    name: "my third playlist",
    primaryColor: "#26c030",
    userId: "615486c478206d637454b5b6",
    follows: 1,
    isFollowed: false,
  },
  {
    _id: "615ea6d8615b7522fac7cc94",
    name: "RHCP Live gigs!",
    userId: "61556affd0b9691c9d0fd089",
    thumbnail:
      "https://images.unsplash.com/photo-1632993952737-0c2897164db3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    primaryColor: "#e7f8f8",
    follows: 3,
    isFollowed: true,
  },
];

describe("Router App", () => {
  const history = createBrowserHistory();

  afterEach(() => {
    cleanup();
    history.push("/");
  });

  test("Navigating from home to tracks page", async () => {
    axios.create.mockReturnThis();
    axios.get
      .mockResolvedValue({ data: { data: [] } })
      .mockResolvedValueOnce({ data: { genres: [] } })
      .mockResolvedValueOnce({ data: { users: [] } })
      .mockResolvedValueOnce({ data: { albums: [] } })
      .mockResolvedValueOnce({ data: { playlists: [] } })
      .mockResolvedValueOnce({ data: { tracks: tracksData } });

    render(
      <Router history={history}>
        <RouterComponent />
      </Router>,
    );

    // wait for App to load App router
    await waitFor(() => screen.getByTestId("layout"));
    await waitFor(() => screen.findAllByTestId("trackCard"));
    expect(screen.getByText(/general dashboard/i)).toBeInTheDocument();

    const leftClick = { button: 0 };
    const seeTracks = document.querySelector('[href="/tracks"]');
    userEvent.click(seeTracks, leftClick);

    await waitFor(() => screen.findAllByTestId("layout"));
    // tracks page rendered
    expect(screen.getAllByText(/My songs/i)[1]).toBeInTheDocument();
  });

  test("Render playlists and navigate to playlists page", async () => {
    axios.create.mockReturnThis();
    axios.get
      .mockResolvedValue({ data: { data: [] } })
      .mockResolvedValueOnce({ data: { genres: [] } })
      .mockResolvedValueOnce({ data: { users: [] } })
      .mockResolvedValueOnce({ data: { albums: [] } })
      .mockResolvedValueOnce({ data: { playlists: playlistData } })
      .mockResolvedValueOnce({ data: { tracks: [] } });

    render(
      <Router history={history}>
        <RouterComponent />
      </Router>,
    );

    await waitFor(() => screen.findAllByTestId("layout"));
    await waitFor(() => screen.getAllByTestId("playlistCard"));

    expect(screen.getByText(/general dashboard/i)).toBeInTheDocument();

    const leftClick = { button: 0 };
    const seePlaylists = document.querySelector('[href="/playlists"]');
    userEvent.click(seePlaylists, leftClick);

    await waitFor(() => screen.findAllByTestId("layout"));
    // tracks page rendered
    expect(screen.getByText(/New Playlist/i)).toBeInTheDocument();
  });
});
