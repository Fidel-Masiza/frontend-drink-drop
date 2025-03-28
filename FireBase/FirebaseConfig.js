import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCKUX1C7WKS6SGDJN9_hMgKaQWZclH5JuY",
  authDomain: "drink-drop-6cefb.firebaseapp.com",
  projectId: "drink-drop-6cefb",
  storageBucket: "drink-drop-6cefb.firebasestorage.app",
  messagingSenderId: "416004195290",
  appId: "1:416004195290:web:433067164ec14c82ddb6e3",
  measurementId: "G-HS1BR9G1E4"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };





