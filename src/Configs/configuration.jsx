import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDBjHjeV5Z2nd6i_3MX5rB2MCoYyPnetHw",
  authDomain: "teenvision-1b7fe.firebaseapp.com",
  databaseURL: "https://teenvision-1b7fe-default-rtdb.firebaseio.com",
  projectId: "teenvision-1b7fe",
  storageBucket: "teenvision-1b7fe.firebasestorage.app",
  messagingSenderId: "1013960162330",
  appId: "1:1013960162330:web:202c6d352848925f8aa5a3",
  measurementId: "G-WFK46TS6XD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default cong;