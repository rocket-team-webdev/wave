/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-disabled-tests */
const request = require("supertest");
const token = require("./token");
const fs = require("fs");
const { config } = require("../config/config");

const requestMeApi = request(`http://localhost:${config.app.port}/api/tracks`);
let trackId = null;

describe("Backend 'tracks' api testing", function () {
  test("POST / upload track", () => {
    const filePath = `${__dirname}/testFiles/testTrack.mp3`;

    if (!fs.existsSync(filePath)) throw new Error("file does not exist");

    return (
      requestMeApi
        .post("/")
        .auth(token, { type: "bearer" })
        .set("Accept", "application/json")
        // .send({
        //   name: "Testing track",
        //   artist: "Testing artist",
        //   album: "Album 5",
        //   genre: "rock",
        // })
        .field("name", "Testing track")
        .field("artist", "Testing artist")
        .field("album", "Album 5")
        .field("genre", "rock")
        .attach("track", filePath)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe("cloudinary track uploaded");
          trackId = response.body._id;
        })
        .catch((err) => {
          throw err;
        })
    );
  });
});
