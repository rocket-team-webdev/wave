/* eslint-disable jest/no-conditional-expect */

let request = require("supertest");

request = request("http://localhost:4000/api/me/tracks");

const token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjM1MDM0MmIwMjU1MDAyYWI3NWUwNTM0YzU4MmVjYzY2Y2YwZTE3ZDIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQnJhaGltIEJlbmFsaWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2ozZVphQVRRQTZRYXplLVdyNnZpU3Noa3ZUUm1DLUdoU0NqZUNFPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3dhdmUtNWNjYmEiLCJhdWQiOiJ3YXZlLTVjY2JhIiwiYXV0aF90aW1lIjoxNjMzNTk5NjkwLCJ1c2VyX2lkIjoiVk1YMThjWnpmbE1yb1dpWmhyYlY5VGZvRHZqMiIsInN1YiI6IlZNWDE4Y1p6ZmxNcm9XaVpocmJWOVRmb0R2ajIiLCJpYXQiOjE2MzM2ODczNjIsImV4cCI6MTYzMzY5MDk2MiwiZW1haWwiOiJicmFoaW1jYXNhc0Bob3RtYWlsLmVzIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDI4ODEyNzY5ODU3NzY2ODY4OTIiXSwiZW1haWwiOlsiYnJhaGltY2FzYXNAaG90bWFpbC5lcyJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.DCsIzlnhTq0Oagb7cAvvYXfWaAREqSaZagf9nK5A5ig0d5FvfIvhy_VM6oLXKPOPAb_HFi9Xa6logKzmilnyqjyWU2ntUxU-SjqEB7r0KZQVNWsnGE20TEn95uVY1oBGs_GcWFxoo2TaOlRg62B8whpgOR-3n2LmEhBrFe9T_TG6ltmZ3G_KuXz9aGiYFjs7b37bvqt3fBf1m2c68Kt0fB3871_ejQdL6l3APpQJSLBoddhCpCGcaC_1oByB7l03ZaMci0vODy61otrphxl8nkpRkMhj9cKTQ0_LD5g1doNJuVe5FqKtMcTsYxXfYLwuL4Heg9k2ElMRZ97Njw3jhQ";

describe("Backend 'me' api testing", function () {
  test("tracks object expected", () => {
    return request
      .get("/")
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
