import React, { useState } from "react";
import { useFormik } from "formik";

import signUpSchema from "./sign-up-schema";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async () => {
      setLoading(true);
      setLoggedIn(false);

      try {
        // await signUpWithEmailAndPassword(
        //   signUpState.email,
        //   signUpState.password,
        // );
        // const data = await sendUserData(signUpState.firstName);
        // const token = await getCurrentUserToken();
        // login({
        //   email: signUpState.email,
        //   token: token,
        //   userId: data.data.userId,
        // });
        // setLoggedIn(true);
      } catch (error) {
        setLoginError(error.message);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <div>
      <body className="text-center">
        <main className="form-signin">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                // placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="profilePicture"
                name="profilePicture"
                placeholder=""
              />
              <label htmlFor="floatingInput">Profile picture</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                // placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">First Name</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                // placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Last Name</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="birthDate"
                name="birthDate"
                // placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Birth date</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                // placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Country</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>
          </form>
          {loading && !loginError && !loggedIn && <h3>Loading...</h3>}
          {!loading && !loginError && loggedIn && <h3>Logged in!</h3>}
          {!loading && loginError && !loggedIn && (
            <h3>Login error: {loginError}</h3>
          )}
        </main>
      </body>
    </div>
  );
}
