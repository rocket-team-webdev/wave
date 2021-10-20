import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// Import your own reducer
import userReducer from "../redux/user/reducer";
import queueReducer from "../redux/music-queue/reducer";

const userData = {
  email: "brahimcasas@hotmail.es",
  token:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwNTM4MmFlMTgxYWJlNjFiOTYwYjA1Yzk3ZmE0MDljNDdhNDQ0ZTciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQnJhaGltIEJlbmFsaWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2ozZVphQVRRQTZRYXplLVdyNnZpU3Noa3ZUUm1DLUdoU0NqZUNFPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3dhdmUtNWNjYmEiLCJhdWQiOiJ3YXZlLTVjY2JhIiwiYXV0aF90aW1lIjoxNjMzNTk5NjkwLCJ1c2VyX2lkIjoiVk1YMThjWnpmbE1yb1dpWmhyYlY5VGZvRHZqMiIsInN1YiI6IlZNWDE4Y1p6ZmxNcm9XaVpocmJWOVRmb0R2ajIiLCJpYXQiOjE2MzM5NDE3NjksImV4cCI6MTYzMzk0NTM2OSwiZW1haWwiOiJicmFoaW1jYXNhc0Bob3RtYWlsLmVzIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDI4ODEyNzY5ODU3NzY2ODY4OTIiXSwiZW1haWwiOlsiYnJhaGltY2FzYXNAaG90bWFpbC5lcyJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.GL9yNV-McQ85nKO7xib5QnumXA-pH_J0grc-cXhHtWxJEYR1PWVT5_L5dhioGBuwJ04pVhhkYCddmHPSN-7S8HaowJ25w-7dwzmxlOJccUA9MgLCsdKJHcXowbJGxxlDJkmRk7U9LRn4L4Mqma3FQaYuzKLMzOwNsSXYOL1xLJwJbajtCu7z0yQTV_GMgN_A2Y6jSC_oW6OOwCYTqNu9jUhn6hp9elb63dwcg455nXW47JYs4n8qQEhRPGBYeMkeEeiFqkLmJxCj33BwAs2exUQckP_1Vtye3770GBzVzjJSCsQw7ptaX5yt363on7lHF3qCYTnyhH-NaPES6yk4vg",
  firstName: "Brahim",
  lastName: "Benalia",
  profilePicture:
    "https://lh3.googleusercontent.com/a-/AOh14Gj3eZaATQA6Qaze-Wr6viSshkvTRmC-GhSCjeCE=s96-c",
  firebaseId: "VMX18cZzflMroWiZhrbV9TfoDvj2",
  isRegistering: false,
  isLogged: true,
  mongoId: "615486c478206d637454b5b6",
  emailVerified: true,
};

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { user: userReducer, queue: queueReducer },
      preloadedState: { user: userData, queue: preloadedState?.queue },
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
