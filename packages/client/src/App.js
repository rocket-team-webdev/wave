import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged, getCurrentUser } from "./services/auth";
import { logIn } from "./redux/user/actions";
import { signInUserData } from "./api/account-api";
import { on } from "./utils/customEvents";

import RouterComponent from "./components/Router";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const userState = useSelector((state) => state.user);

  async function handleExistingUser(firebaseUser) {
    const token = firebaseUser.multiFactor.user.accessToken;
    const dbUser = (await signInUserData(token)).data.data;

    dispatch(
      logIn({
        email: firebaseUser.email,
        token: firebaseUser.multiFactor.user.accessToken,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        profilePicture: dbUser.profilePicture || "",
        firebaseId: firebaseUser.uid,
        isLogged: true,
        mongoId: dbUser._id,
        googleProvider:
          firebaseUser.multiFactor.user.providerData[0].providerId ===
          "google.com",
      }),
    );
    setLoading(false);
  }

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user && user.emailVerified && !userState.isRegistering) {
        handleExistingUser(user);
        console.log("firebaseUser", user.multiFactor.user.providerData);
      } else {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    on("setLoginReduxState", () => {
      const firebaseUser = getCurrentUser();
      handleExistingUser(firebaseUser);
    });
  });

  return (
    <>
      {!loading && <RouterComponent />}

      <ToastContainer draggable theme="colored" />
    </>
  );
}

export default App;
