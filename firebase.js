import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "./components/Main/firebaseConfig";

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();
const fs = firebase.firestore;
const auth = firebase.auth();
//const storage = firebase.storage();

export { db, auth, fs };
