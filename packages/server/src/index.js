const app = require("./server");
const cron = require("node-cron");
const { config } = require("./config/config");
const connect = require("./db/connect");
const { updateListenedTracks } = require("./services/statistics/wave-stats");
// const {
//   seedUsers,
//   seedGenres,
//   seedAlbum,
// seedTrack,
//   seedPlaylist,
// } = require("./db/seed");

connect()
  .then(async () => {
    // await seedUsers();
    // await seedGenres();
    // await seedAlbum();
    // await seedTrack();
    // await seedPlaylist();

    app.listen(config.app.port, () => {
      console.log(`Server running at port ${config.app.port}`);
    });

    cron.schedule(
      "58 * * * *",
      () => {
        updateListenedTracks();
      },
      {
        scheduled: true,
        timezone: "Europe/Madrid",
      },
    );
  })
  .catch((err) => {
    console.log(err);
  });
