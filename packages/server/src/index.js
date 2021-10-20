const app = require("./server");
const cron = require("node-cron");
const { config } = require("./config/config");
const connect = require("./db/connect");
const { updateListenedTracks } = require("./services/statistics/wave-stats");
const { seedGenres } = require("./db/seed");

connect()
  .then(async () => {
    app.listen(config.app.port, () => {
      console.log(`Server running at port ${config.app.port}`);
    });

    seedGenres();

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
