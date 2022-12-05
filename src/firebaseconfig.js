// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJTcMOnI97chz7bWkOpNSkT8fZ8T7jgNE",
  authDomain: "super-supper-c3c0c.firebaseapp.com",
  projectId: "super-supper-c3c0c",
  storageBucket: "super-supper-c3c0c.appspot.com",
  messagingSenderId: "713200139774",
  appId: "1:713200139774:web:1c9fa7921a41b99b3754af",
  measurementId: "G-98GYRVPJKR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore();

export const storage = getStorage(app);
export default db;

/* 

// collection ref
const colRef = collection(db, "suppers");

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    // console.log(snapshot.docs)
    let suppers = [];
    snapshot.docs.forEach((doc) => {
      suppers.push({ ...doc.data(), id: doc.id });
    });
    console.log(suppers);
  })
  .catch((err) => {
    console.log(err.message);
  });

  */
