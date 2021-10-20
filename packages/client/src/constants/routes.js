// import from .env

const { REACT_APP_WAVE_API_ROUTE, REACT_APP_WAVE_STATS_API_ROUTE } =
  process.env;

// PUBLIC PAGES

export const PUBLIC = {
  HOME: "/",
  MY_SONGS: "/tracks",
  TRACKS: "/tracks",
  MY_PLAYLISTS: "/playlists",
  ALBUMS: "/albums",
  UPDATE_PASSWORD: "/account/settings/update-password",
  RESET_PASSWORD: "/account/settings/reset-password",
  SIGN_UP: "/sign-up",
  SIGN_IN: "/sign-in",
  REAUTHENTICATE: "/reauthenticate",
  USER_ACCOUNT: "/account",
  APP_STATS: "/stats",
  USER_VIEW: "/users",
  USERS: "/users",
  PLAYLISTS: "/playlists",
  TRACK_EDIT: "/tracks/update", // TODO delete this or TRACK_UPDATE
  TRACK_UPLOAD: "/tracks/upload",
  TRACK_UPDATE: "/tracks/update",
  ADD_ALBUM: "/albums/add",
  ALBUM: "/album",
  UPDATE_ALBUM: "/albums/update",
  ADD_PLAYLIST: "/playlists/add",
  SINGLE_PLAYLIST: "/playlist",
  PLAYLIST_UPDATE: "/playlist/update",
  QUEUE: "/queue",
  NOT_FOUND: "/404",
  POPULAR: "/popular",
  SEARCH: "/search",
  VERIFY_EMAIL: "/email-verification",
};

// PRIVATE PAGES

export const PRIVATE = {
  ADMIN_SIGN_IN: "/admin",
};

// API

export const API = {
  MAIN: REACT_APP_WAVE_API_ROUTE,
  ACCOUNT: "/account",
  REGISTER: "/register",
  AUTHENTICATE: "/authenticate",
  GENRE: "/genres",
  ALBUM: "/albums",
  PLAYLISTS: "/playlists",
  USER: "/user",
  USERS: "/users",
  ME: "/me",
  TRACKS: "/tracks",
  LIKED: "/liked",
  FOLLOW: "/follow",
  FOLLOWERS: "/followers",
  FOLLOWING: "/following",
  SEARCH: "/search",
  ADD_TRACK: "/add-track",
  REMOVE_TRACK: "/remove-track",
};

// STATS API

export const STATS_API = {
  MAIN: REACT_APP_WAVE_STATS_API_ROUTE,
  PLAYBACKS: "/playbacks",
};
