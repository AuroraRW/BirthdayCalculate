import fb from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBb4zuZFE2G_CNaE1J0422IZ-tdF9cD0_Y",
    authDomain: "assignment-32caf.firebaseapp.com",
    databaseURL: "https://assignment-32caf-default-rtdb.firebaseio.com",
    projectId: "assignment-32caf",
    storageBucket: "assignment-32caf.appspot.com",
    messagingSenderId: "28434395052",
    appId: "1:28434395052:web:be8ac3451feea623fe5409"
  };

// Initialize Firebase
fb.initializeApp(firebaseConfig);
export const db = fb.database();
export const auth = fb.auth();
