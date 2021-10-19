/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-conditional-expect */
const request = require("supertest");
const token = require("./token");
const { config } = require("../config/config");

const requestMeApi = request(`http://localhost:${config.app.port}/api/me`);

describe("Backend 'me' api testing", function () {
  test("GET / my tracks", () => {
    return requestMeApi
      .get("/tracks")
      .auth(token, { type: "bearer" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              artist: expect.any(String),
              url: expect.any(String),
              isLiked: expect.any(Boolean),
            }),
          ]),
        );
      })
      .catch((err) => {
        throw err;
      });
  });
});
