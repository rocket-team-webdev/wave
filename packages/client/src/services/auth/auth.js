import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { updatePassword, reauthenticateWithCredential } from "firebase/auth";

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyAkNV3TlhB3J6zhmWBK_3XMY90z845Z2tA",
    authDomain: "wave-5ccba.firebaseapp.com",
    projectId: "wave-5ccba",
    storageBucket: "wave-5ccba.appspot.com",
    messagingSenderId: "452328699060",
    appId: "1:452328699060:web:2b254e1dca9657544653e1",
    measurementId: "G-35FSM0H7MY",
  };

  firebase.initializeApp(firebaseConfig);
} else {
  // if already initialized, use that one
  firebase.app();
}

export const auth = firebase.auth();

export function onAuthStateChanged(...props) {
  return auth.onAuthStateChanged(...props);
}

export function signInWithGoogle() {
  const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

  return auth.signInWithPopup(GoogleAuthProvider);
}

export function signInWithEmailAndPassword(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function signUpWithEmailAndPassword(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function sendPasswordResetEmail(email) {
  return auth.sendPasswordResetEmail(email);
}

export function signOut() {
  return auth.signOut();
}

export async function signIn(email, password) {
  const signInResponse = await signInWithEmailAndPassword(email, password);
  return signInResponse;
}

export function getCurrentUserToken() {
  if (!auth.currentUser) {
    return null;
  }

  return auth.currentUser.getIdToken();
}

export function deleteCurrentUserAccount() {
  console.log("auth.currentUser", auth.currentUser);
  if (!auth.currentUser) {
    return null;
  }

  return auth.currentUser.delete();
}

export function getCurrentUserEmail() {
  if (!auth.currentUser) {
    return null;
  }

  return auth.currentUser.email;
}

export function updateUserPassword(newPassword) {
  return updatePassword(auth.currentUser, newPassword);
}

export function reauthenticateUserWithCredential(userPassword) {
  const credential = firebase.auth.EmailAuthProvider.credential(
    auth.currentUser.email,
    userPassword,
  );
  return reauthenticateWithCredential(auth.currentUser, credential);
}
