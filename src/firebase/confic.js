import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAqFhF-Z4EmDmHfLxqjCI6_xiwlvbr_gbM",
    authDomain: "rishanthan-dev.firebaseapp.com",
    databaseURL: "https://rishanthan-dev-default-rtdb.firebaseio.com",
    projectId: "rishanthan-dev",
    storageBucket: "rishanthan-dev.firebasestorage.app",
    messagingSenderId: "663269486534",
    appId: "1:663269486534:web:9f3089ea4eb66a9ee58cc7",
};

const app = initializeApp(firebaseConfig);

// Named exports (clean & professional)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
