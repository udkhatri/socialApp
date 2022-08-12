import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJACoavkHZ1xzklRJ5TTB4KhseNxpcwPM",
  authDomain: "socialshare-2f71b.firebaseapp.com",
  projectId: "socialshare-2f71b",
  storageBucket: "socialshare-2f71b.appspot.com",
  messagingSenderId: "747767873576",
  appId: "1:747767873576:web:709739659cb3dfeeb4351d",
  measurementId: "G-9K9NRGGP69"
};

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
