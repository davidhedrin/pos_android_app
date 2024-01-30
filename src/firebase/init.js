import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWV1ICQsC8XvZXk4quIQVPr4g4q3-zkDs",
  authDomain: "notif-crm-pos.firebaseapp.com",
  projectId: "notif-crm-pos",
  storageBucket: "notif-crm-pos.appspot.com",
  messagingSenderId: "580875880818",
  appId: "1:580875880818:web:443a074ff9623a211535eb",
};

// init firebase
initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore();
export default db;
