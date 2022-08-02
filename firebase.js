import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBh0FmJ-qoHsNKXMQlKIbYar4U_yQ3ZVr0",
  authDomain: "instagram-udkhatri.firebaseapp.com",
  projectId: "instagram-udkhatri",
  storageBucket: "instagram-udkhatri.appspot.com",
  messagingSenderId: "1027617421094",
  appId: "1:1027617421094:web:41fbf996c040312158b3e7",
  measurementId: "G-RHS3LZJ1FH"
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
