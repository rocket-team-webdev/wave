import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import {
  updatePassword,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  OAuthProvider,
  applyActionCode,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";

if (!firebase.apps.length) {
  const { 
REACT_APP_FB_API_KEY,
REACT_APP_FB_AUTH_DOMAIN,
REACT_APP_FB_PROJECT_ID,
REACT_APP_FB_STORAGE_BUCKET,
REACT_APP_FB_MSG_SENDER_ID,
REACT_APP_FB_APP_ID,
REACT_APP_FB_MEASUREMENT_ID } =
  process.env;
  const firebaseConfig = {
    apiKey: REACT_APP_FB_API_KEY,
    authDomain: REACT_APP_FB_AUTH_DOMAIN,
    projectId: REACT_APP_FB_PROJECT_ID,
    storageBucket: REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FB_MSG_SENDER_ID,
    appId: REACT_APP_FB_APP_ID,
    measurementId: REACT_APP_FB_MEASUREMENT_ID,
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

export function emailVerification() {
  return auth.currentUser.sendEmailVerification();
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

export function getCurrentUser() {
  if (!auth.currentUser) {
    return null;
  }

  return auth.currentUser;
}

export function deleteCurrentUserAccount() {
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

export function setCredentialsPersistance(checkboxRef) {
  if (checkboxRef.current.checked) {
    return auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }
  return auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
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

export function reauthenticateUserWithGoogle() {
  const provider = new OAuthProvider("google.com");

  return reauthenticateWithPopup(auth.currentUser, provider);
}

export function handleVerifyEmail(actionCode) {
  return applyActionCode(auth, actionCode);
}

export function handleVerifyPasswordResetCode(actionCode) {
  return verifyPasswordResetCode(auth, actionCode);
}

export function handleConfirmPasswordReset(actionCode, newPassword) {
  return confirmPasswordReset(auth, actionCode, newPassword);
}
