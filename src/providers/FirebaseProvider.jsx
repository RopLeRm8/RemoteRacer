import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "@firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSGID,
  appId: process.env.REACT_APP_FIREBASE_appID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREID,
});

export const auth = app.auth();
export const storage = getStorage(app);
export const db = getDatabase(app);

const provider = new GoogleAuthProvider();
const gitprovider = new GithubAuthProvider();

// Google authentication
export const googleauth = () => {
  const authProviders = getAuth(app);
  signInWithPopup(authProviders, provider)
    .then(() => {
      console.log("hi");
    })
    .catch((err) => {
      console.log(err.code);
      console.log(err.message);
    });
};
// git Authentication
export const gitauth = () => {
  const authProviders = getAuth(app);
  signInWithPopup(authProviders, gitprovider)
    .then(() => {})
    .catch(() => {
      //  const errorCode = authErrorToTitleCase(error.code);
      //  console.log(errorCode)
    });
};

export default app;
