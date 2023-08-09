import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8nmHlbyz-BIak0Vr_CYLQ4ONV33jljQ4",
  authDomain: "chatty-2489e.firebaseapp.com",
  projectId: "chatty-2489e",
  storageBucket: "chatty-2489e.appspot.com",
  messagingSenderId: "149593165200",
  appId: "1:149593165200:web:16eb7893081e7e13d13715",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
