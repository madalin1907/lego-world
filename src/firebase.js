import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const config = {
  apiKey: "AIzaSyDNBJEmX6Jqod_iCVqgeMSt9J4_jaPpjc0",
  authDomain: "lego-world-23c24.firebaseapp.com",
  projectId: "lego-world-23c24",
  storageBucket: "lego-world-23c24.appspot.com",
  messagingSenderId: "524497363689",
  appId: "1:524497363689:web:01bda62bbfba8f67948678"
};

const firebase = initializeApp(config);

firebase.firestore();

const auth = firebase.auth()

const storage = firebase.storage();

export default firebase;

export { auth, storage }
