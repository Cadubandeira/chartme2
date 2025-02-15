// Firebase Configuration and Initialization

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFAh_QfHaQqXIna07yHuHzN6EW4mGCtUE",
    authDomain: "chartme-2c4aa.firebaseapp.com",
    projectId: "chartme-2c4aa",
    storageBucket: "chartme-2c4aa.firebasestorage.app",
    messagingSenderId: "1000796548418",
    appId: "1:1000796548418:web:c891c61205cdf404f1ecdb",
    measurementId: "G-T2686T1ETY"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();
  // Make Firebase Auth and DB globally available.
  window.auth = auth;
  window.db = db;
  window.storage = storage;