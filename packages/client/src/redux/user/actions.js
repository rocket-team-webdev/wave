import { SET_LOGIN, SET_LOGOUT } from "./types";
// import { API } from "../../constants/routes";
// const axios = require("axios");

// export const logIn = (loginState) => {
//   const reqUrl = `?email=${loginState.email}&password=${loginState.password}`;
//   return async (dispatch) => {
//     axios.get(`${API.MAIN}${API.LOGIN}${reqUrl}`).then((response) => {
//       dispatch({
//         type: SET_LOGIN,
//         payload: response.data,
//       });
//     });
//   };
// };

export const logIn = (value) => ({
  type: SET_LOGIN,
  payload: value,
});

export const logOut = () => ({ type: SET_LOGOUT });
