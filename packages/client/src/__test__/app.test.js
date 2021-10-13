/* eslint-disable jest/no-disabled-tests */

import userEvent from "@testing-library/user-event";
import React from "react";
import { act } from "react-dom/test-utils";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
// import { MemoryRouter } from "react-router-dom";
// import { useDispatch } from "react-redux";
import axios from "axios";
import {
  render,
  screen,
  waitFor,
  cleanup,
  fireEvent,
} from "../utils/test-utils";
// import { logIn } from "../redux/user/actions";

// import firebase from "firebase/compat/app";

import "@testing-library/jest-dom";

// import { getMyTracks } from "../api/me-api";

// import App from "../App";
import Home from "../pages/Public/Home";
import Tracks from "../pages/Public/Tracks";
import RouterComponent from "../components/Router";

const userData = {
  email: "ernest.duocastella@gmail.com",
  token:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwNTM4MmFlMTgxYWJlNjFiOTYwYjA1Yzk3ZmE0MDljNDdhNDQ0ZTciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRXJuZXN0IER1b2Nhc3RlbGxhIFRvcnJ1ZWxsYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp6WUlkVFRUN2tqaFZKT2NZNFQ2ZHRRSS1wU2VTZm9zMWt4S2h1eT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS93YXZlLTVjY2JhIiwiYXVkIjoid2F2ZS01Y2NiYSIsImF1dGhfdGltZSI6MTYzMzk1MTI5MSwidXNlcl9pZCI6IjhvMndpc3dSaDRRcFVjS01LS2RMU2tNaG1GYjIiLCJzdWIiOiI4bzJ3aXN3Umg0UXBVY0tNS0tkTFNrTWhtRmIyIiwiaWF0IjoxNjMzOTUxMjkxLCJleHAiOjE2MzM5NTQ4OTEsImVtYWlsIjoiZXJuZXN0LmR1b2Nhc3RlbGxhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTE3NTMxNDU0NjUzMzgzMzEzODE4Il0sImVtYWlsIjpbImVybmVzdC5kdW9jYXN0ZWxsYUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.oKV9q_k6jcp6W9G6Hr2rdHRKpekUDLJm377gva8J4dvurIhZEHnJqpmG8TMiqRyBdaQEtf1Eh6soZe4LYbuLKoZyNdsl7YoYLMIchN7V6w_RKX_2yZfXj4gPFUtDb15A4COLxYLGLKp8AKCEcnePmVeZngg7gP7SWrDyaZKSNwrjho8PNc9U-wzwe7fc5b6H8NtakXlH0Q3eEg1t2P0gK-0pDLDtqDD3Hb4eq6Zp4ALf1D0GHWG8iCDkjQnDReqaZhAtDQldhNRK536L-H7oLXH_3aRKFM5hT4vCULF465mos-ki65XqGxifRMSI5aCf85NjrZAV33CfWt1i87d_cAa",
  firstName: "Ernest",
  lastName: "Duocastella",
  profilePicture:
    "https://res.cloudinary.com/dz5nspe7f/image/upload/v1633334998/default-preset/default-profile-picture_vbob5l.png",
  firebaseId: "8o2wiswRh4QpUcKMKKdLSkMhmFb2",
  isRegistering: false,
  isLogged: true,
  mongoId: "615426f61755f546b465a66f",
  emailVerified: true,
};

jest.mock("firebase/compat/app", () => {
  return {
    auth: jest.fn(() => {
      return {
        onAuthStateChanged: jest.fn().mockResolvedValue(userData),
      };
    }),
    apps: [],
    initializeApp: jest.fn(),
  };
});

// jest.mock("firebase/compat/app", () => {
//   return {
//     auth: jest.fn().mockReturnThis(),
//     currentUser: userData,
//     signInWithEmailAndPassword: jest.fn(),
//     createUserWithEmailAndPassword: jest.fn(),
//     sendPasswordResetEmail: jest.fn(),
//     signOut: jest.fn(),
//     onAuthStateChanged: jest.fn().mockResolvedValue(),
//     initializeApp: jest.fn(),
//     apps: [],
//   };
// });

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

// jest.mock("axios");
// jest.mock("firebase/compat/app");

describe("Should render", () => {
  afterEach(cleanup);

  // test("tracks page rendering", async () => {
  //   const history = createMemoryHistory();

  //   //* Esto funciona con el mock de axios.js asi { get: ...}
  //   // axios.get.mockResolvedValue(tracksData);
  //   // const result = await getMyTracks(0, 5, axios);
  //   // expect(result).toEqual(tracksData);

  //   //* Esto funciona con el mock de axios.js sin parametros
  //   axios.create.mockReturnThis();
  //   axios.get
  //     .mockResolvedValue({ data: { data: [] } })
  //     .mockResolvedValueOnce({ data: { data: [] } })
  //     .mockResolvedValueOnce(tracksData);

  //   render(
  //     <Router history={history}>
  //       <Tracks />
  //     </Router>,
  //   );

  //   // wait for App to load tracks
  //   const browserRouter = await waitFor(() =>
  //     screen.findAllByTestId("trackCard"),
  //   );

  //   // expect tracks to be rendered
  //   expect(browserRouter).toHaveLength(2);

  //   // tracks page rendered
  //   expect(screen.getByText(/my songs/i)).toBeInTheDocument();
  // });

  test("full app rendering/navigating", async () => {
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

    const leftClick = { button: 0 };
    const see = document.querySelector('[href="/tracks"]');
    // screen.debug(see);

    userEvent.click(see, leftClick);

    await waitFor(() => screen.findAllByTestId("layout"));

    // tracks page rendered
    expect(screen.getByText(/my songs/i)).toBeInTheDocument();
  });

  test.skip("Navigating from popular to myWave", async () => {
    const history = createMemoryHistory();

    const home = render(
      <Router history={history}>
        <Home />
      </Router>,
    );

    // Home page rendered - Popular
    expect(screen.getByText(/playlists/i)).toBeInTheDocument();

    // Home page rendered - MyWave
    // userEvent.click(screen.getByLabelText(/MyWave/i));
    // expect(screen.getByText(/my playlists/i)).toBeInTheDocument();

    // fireEvent.click(mywave);
    const mywave = home.getByLabelText(/mywave/i);
    const popular = home.getByLabelText(/popular/i);

    expect(popular).toBeChecked();
    expect(mywave).not.toBeChecked();

    fireEvent.change(mywave, { target: { checked: true } });
    expect(popular).not.toBeChecked();
    expect(mywave).toBeChecked();
  });

  test.skip("Navigating from home to tracks page", async () => {
    const history = createMemoryHistory();

    history.push("/");

    render(
      <Router history={history}>
        <Tracks />
      </Router>,
    );

    expect(screen.getByText(/my songs/i)).toBeInTheDocument();
  });
});
