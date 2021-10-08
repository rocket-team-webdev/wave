/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-disabled-tests */
const request = require("supertest");
const token = require("./token");
const { config } = require("../config/config");

const requestApi = request(`http://localhost:${config.app.port}/api/albums`);

describe("Backend 'album' api testing", function () {
  test.skip("POST / create album", () => {
    return requestApi
      .post("/")
      .auth(token, { type: "bearer" })
      .set("Accept", "application/json")
      .send({
        title: "Testing Album",
        year: 1994,
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("album created successfully");
      })
      .catch((err) => {
        throw err;
      });
  });
});
