// PUBLIC PAGES

export const PUBLIC = {
  HOME: "/",
  MY_SONGS: "/tracks",
  MY_PLAYLISTS: "/playlists",
  ALBUMS: "/albums",
  UPDATE_PASSWORD: "/account/settings/update-password",
  RESET_PASSWORD: "/account/settings/reset-password",
  SIGN_UP: "/sign-up",
  SIGN_IN: "/sign-in",
  REAUTHENTICATE: "/reauthenticate",
  USER_ACCOUNT: "/account",
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
};

// PRIVATE PAGES

export const PRIVATE = {
  ADMIN_SIGN_IN: "/admin",
};

// API

export const API = {
  MAIN: "http://localhost:4000/api",
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
  FOLLOWERS: "/followers",
  FOLLOWING: "/following",
  SEARCH: "/search",
  ADD_TRACK: "/add-track",
  REMOVE_TRACK: "/remove-track",
};

// STATS API

export const STATS_API = {
  // MAIN: "http://localhost:8100/api",
  MAIN: "https://wave-stats-api-dev.herokuapp.com/api",
  PLAYBACKS: "/playbacks",
};
