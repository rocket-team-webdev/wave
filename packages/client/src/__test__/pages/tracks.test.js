/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jest/no-disabled-tests */
import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import axios from "axios";
import { render, screen, waitFor, cleanup } from "../../utils/test-utils";
import "@testing-library/jest-dom";

import Tracks from "../../pages/Public/Tracks";
import { getMyTracks } from "../../api/me-api";

jest.mock("firebase/compat/app", () => {
  return {
    auth: jest.fn(() => {
      return {
        onAuthStateChanged: jest.fn().mockResolvedValue(),
      };
    }),
    apps: [],
    initializeApp: jest.fn(),
  };
});

const tracksData = {
  data: {
    data: [
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
    ],
  },
};

describe("Tracks Page test", () => {
  afterEach(cleanup);

  test("Tracks page rendering without songs", async () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Tracks />
      </Router>,
    );

    // tracks page rendered
    expect(screen.getAllByText(/my songs/i)[1]).toBeInTheDocument();
  });

  test("Tracks page fetch songs", async () => {
    axios.create.mockReturnThis();
    axios.get.mockResolvedValue(tracksData);

    const result = await getMyTracks(0, 5, axios);
    expect(result).toEqual(tracksData);
  });

  test.skip("Tracks page rendering with songs", async () => {
    const history = createMemoryHistory();

    axios.create.mockReturnThis();
    axios.get.mockResolvedValue(tracksData);
    // .mockResolvedValueOnce(tracksData)
    // .mockResolvedValueOnce({ data: { data: [] } });

    render(
      <Router history={history}>
        <Tracks />
      </Router>,
    );

    // wait for App to load tracks
    await waitFor(() => screen.getAllByTestId("layout"));
    const browserRouter = await waitFor(() =>
      screen.findAllByTestId("trackCard"),
    );

    // expect tracks to be rendered
    expect(browserRouter).toHaveLength(2);
    // tracks page rendered
    expect(screen.getByText(/my songs/i)[1]).toBeInTheDocument();
  });
});
