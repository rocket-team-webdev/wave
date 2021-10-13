/* eslint-disable jest/no-disabled-tests */
import userEvent from "@testing-library/user-event";
import React from "react";
import { act } from "react-dom/test-utils";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import axios from "axios";
// import * as id3 from "id3js/lib/id3";

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

describe("Router app rendering", () => {
  afterEach(cleanup);

  test.skip("Navigating from home to tracks page", async () => {
    const history = createMemoryHistory();

    act(() => {
      axios.create.mockReturnThis();
      axios.get
        .mockResolvedValue({ data: { data: [] } })
        .mockResolvedValueOnce({ data: { genres: [] } })
        .mockResolvedValueOnce({ data: { playlists: [] } })
        .mockResolvedValueOnce({ data: { tracks: tracksData } });
    });

    act(() => {
      render(
        <Router history={history}>
          <RouterComponent />
        </Router>,
      );
    });

    // wait for App to load App router
    await waitFor(() => screen.findAllByTestId("layout"));
    await waitFor(() => screen.findAllByTestId("trackCard"));
    expect(screen.getByText(/welcome to waveapp/i)).toBeInTheDocument();

    const leftClick = { button: 0 };
    const see = document.querySelector('[href="/tracks"]');
    userEvent.click(see, leftClick);

    await waitFor(() => screen.findAllByTestId("layout"));
    // tracks page rendered
    expect(screen.getByText(/my songs/i)).toBeInTheDocument();
  });
});
