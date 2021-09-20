const db = require("../models");

const { getSeedUsers } = require("./user-seed");
const { getSeedGenres } = require("./genre-seed");
const { getSeedAlbum } = require("./album-seed");
const { getSeedTrack } = require("./track-seed");
const { getSeedPlaylist } = require("./playlist-seed");

async function seedUsers() {
  const results = getSeedUsers();

  await db.User.deleteMany({});
  await db.User.create([...results]);
}
async function seedGenres() {
  const results = getSeedGenres();

  await db.Genre.deleteMany({});
  await db.Genre.create([...results]);
}
async function seedAlbum() {
  const results = await getSeedAlbum();

  await db.Album.deleteMany({});
  await db.Album.create([...results]);
}
async function seedTrack() {
  const results = await getSeedTrack();

  await db.Track.deleteMany({});
  await db.Track.create([...results]);
}
async function seedPlaylist() {
  const results = await getSeedPlaylist();

  await db.Playlist.deleteMany({});
  await db.Playlist.create([...results]);
}

module.exports = { seedUsers, seedGenres, seedAlbum, seedTrack, seedPlaylist };
