import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth'

const app = firebase.initializeApp({

    apiKey: "AIzaSyAfSIj-unNx7i5pAk6iX4yQoVcQBbgW_s0",
    authDomain: "react-project-321f9.firebaseapp.com",
    databaseURL: process.env.REACT_FIREBASE_URL,
    projectId: process.env.REACT_FIREBASE_ID,
    storageBucket: process.env.REACT_FIREBASE_STORAGE,
    messagingSenderId: process.env.REACT_FIREBASE_MSGID,
    appId: process.env.REACT_FIREBASE_appID,
    measurementId: "G-KN069SZKMH"

})
export const auth = app.auth()

const provider = new GoogleAuthProvider();
export const googleauth = () =>{
    signInWithPopup(auth, provider)
    .then(() => {
     }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export default app