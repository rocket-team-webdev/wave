const userData = {
  email: "brahimcasas@hotmail.es",
  token:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjM1MDM0MmIwMjU1MDAyYWI3NWUwNTM0YzU4MmVjYzY2Y2YwZTE3ZDIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQnJhaGltIEJlbmFsaWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2ozZVphQVRRQTZRYXplLVdyNnZpU3Noa3ZUUm1DLUdoU0NqZUNFPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3dhdmUtNWNjYmEiLCJhdWQiOiJ3YXZlLTVjY2JhIiwiYXV0aF90aW1lIjoxNjMzNTk5NjkwLCJ1c2VyX2lkIjoiVk1YMThjWnpmbE1yb1dpWmhyYlY5VGZvRHZqMiIsInN1YiI6IlZNWDE4Y1p6ZmxNcm9XaVpocmJWOVRmb0R2ajIiLCJpYXQiOjE2MzM2MDM2ODYsImV4cCI6MTYzMzYwNzI4NiwiZW1haWwiOiJicmFoaW1jYXNhc0Bob3RtYWlsLmVzIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDI4ODEyNzY5ODU3NzY2ODY4OTIiXSwiZW1haWwiOlsiYnJhaGltY2FzYXNAaG90bWFpbC5lcyJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.VbRWaE9Gx-UfPIIqBKIwal6beFYhkTMn2o4jjptrpz28ypBY5UH8iJAE3PFp-S06ArE_BJEiwuUVbWsu7cmeNyQBSWQN6uFb2ZUF51EQM2G4BgV5Mo8EDfGzeUSI9eTzG4JBmEaHWogQ37BHGHfJzG5fD3eXaksSMRjfU9N6sPSG4nuQQN7lFClwdTS8eiv2RsMpCRM6hM50EzbbYph2jZhdfjPRnBFUK_4jOwWSih3c7YRyfUPsdF97qBAEfbAEXCC1irtwS0CxAyPxNqfmvL-leJdDrUxAsV5Ko86oG5dZAphtnygU7QvBsD0KJRmp6kNGKKDHOvMoVTq5FTjxvQ",
  firstName: "Brahim",
  lastName: "Benalia",
  profilePicture:
    "https://lh3.googleusercontent.com/a-/AOh14Gj3eZaATQA6Qaze-Wr6viSshkvTRmC-GhSCjeCE=s96-c",
  firebaseId: "VMX18cZzflMroWiZhrbV9TfoDvj2",
  isRegistering: false,
  isLogged: true,
  mongoId: "615486c478206d637454b5b6",
  emailVerified: true,
};

export default {
  auth: jest.fn(),
  currentUser: userData,
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn().mockResolvedValue(),
  initializeApp: jest.fn(),
  apps: [],
};
