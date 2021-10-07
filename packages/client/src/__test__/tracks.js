/* eslint-disable jest/no-done-callback */
/* eslint-disable jest/expect-expect */

// import request from "supertest";
// import { getCurrentUserToken } from "../services/auth";

// const requestApi = request("http://localhost:4000");

// async function getToken(callback) {
//   // perform some async action

//   // call the callback when done
//   const res = await getCurrentUserToken();
//   callback(res);
// }

// describe("GET /tracks", () => {
//   it("responds with json", async (done) => {
//     const token = await getCurrentUserToken();

//     console.log(token);

//     return requestApi
//       .get("/api/tracks")
//       .auth(
//         // "eyJhbGciOiJSUzI1NiIsImtpZCI6IjM1MDM0MmIwMjU1MDAyYWI3NWUwNTM0YzU4MmVjYzY2Y2YwZTE3ZDIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQnJhaGltIEJlbmFsaWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2ozZVphQVRRQTZRYXplLVdyNnZpU3Noa3ZUUm1DLUdoU0NqZUNFPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3dhdmUtNWNjYmEiLCJhdWQiOiJ3YXZlLTVjY2JhIiwiYXV0aF90aW1lIjoxNjMzNTM0Nzg2LCJ1c2VyX2lkIjoiVk1YMThjWnpmbE1yb1dpWmhyYlY5VGZvRHZqMiIsInN1YiI6IlZNWDE4Y1p6ZmxNcm9XaVpocmJWOVRmb0R2ajIiLCJpYXQiOjE2MzM1Mzg0MDgsImV4cCI6MTYzMzU0MjAwOCwiZW1haWwiOiJicmFoaW1jYXNhc0Bob3RtYWlsLmVzIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDI4ODEyNzY5ODU3NzY2ODY4OTIiXSwiZW1haWwiOlsiYnJhaGltY2FzYXNAaG90bWFpbC5lcyJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.G5RvgcZT60Ykqogvj-yg5iXJFmFD-IsuCT1AWdfWAtHbriMIo7EBCsh90eogMeznrigkstCVI2LJoLtRNx6_M6wDTA3hlCkOP3prOxo6NtDZ6SeZI-wUoriXxGKM8A5_wMRZ7_sIInwSETRhojLu9COAEHYpP0t4ayHm2C4kZzmgUQtzdJlII1Gz1PYliSJ2D8EWNiEq2IneVaEgEzTPBHN4F1kZGHuuSNaJBAE-4iTl0fcCF80adRnO-CIQ7AGHvRr-Ts1S25rZVqQmKWgQw5Mwa0FiDIW6cyIF6OKkFp-CVsVBB2MoOtsCtJJoDyzJyB99NesOP33F7P5OhM-xww",
//         token,
//         { type: "bearer" },
//       )
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .then(() => {
//         done();
//       })
//       .catch((err) => done(err));
//   });

//   it("probando", (done) => {
//     getToken((result) => {
//       expect(result).toBe(1);
//       // Jest will wait until the done callback is called
//       // before finishing the test
//       done();
//     });
//   });
// });
