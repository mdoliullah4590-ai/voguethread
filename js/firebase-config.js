const firebaseConfig = {
  apiKey: "AIzaSyDg4nDtEjtTuqd2plCrXBhHzJxC2B6avJs",
  authDomain: "voguethread-store.firebaseapp.com",
  projectId: "voguethread-store",
  storageBucket: "voguethread-store.firebasestorage.app",
  messagingSenderId: "959877691145",
  appId: "1:959877691145:web:691a55cbd8c52cda5505d8",
  measurementId: "G-KQYKNXZJJ9"
};

firebase.initializeApp(firebaseConfig);

const auth    = firebase.auth();
const db      = firebase.firestore();
const storage = firebase.storage();
