import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1T3uxNI_wuozRf-Z3sgfyi0hW4j1E8c4",
  authDomain: "unireview-893b2.firebaseapp.com",
  projectId: "unireview-893b2",
  storageBucket: "unireview-893b2.firebasestorage.app",
  messagingSenderId: "402672087974",
  appId: "1:402672087974:web:1523a691325d397228d567"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };