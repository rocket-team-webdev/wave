/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-disabled-tests */
const request = require("supertest");
const token = require("./token");
const { config } = require("../config/config");

const requestApi = request(`http://localhost:${config.app.port}/api/albums`);
let albumId = null;

describe("Backend 'album' api testing", function () {
  test("POST / create album", () => {
    return requestApi
      .post("/")
      .auth(token, { type: "bearer" })
      .set("Accept", "application/json")
      .field("title", "Testing Album")
      .field("year", 2000)
      .attach("thumbnail", null)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("album created successfully");
        albumId = response.body._id;
      })
      .catch((err) => {
        throw err;
      });
  });

  test("DELETE / delete album", () => {
    return requestApi
      .delete(`/${albumId}`)
      .auth(token, { type: "bearer" })
      .set("Accept", "application/json")
      .field("title", "Testing Album")
      .field("year", 2000)
      .attach("thumbnail", null)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("Album deleted successfully");
      })
      .catch((err) => {
        throw err;
      });
  });
});
