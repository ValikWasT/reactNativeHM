import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAi4My_xgIv0Bl9icAqLzD7-Q5aIo2UmhI",
  authDomain: "reactnativehm.firebaseapp.com",
  projectId: "reactnativehm",
  storageBucket: "reactnativehm.appspot.com",
  messagingSenderId: "505680014080",
  appId: "1:505680014080:web:92bb537de7723a036261e5",
  measurementId: "G-6XKLTZF24L",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
