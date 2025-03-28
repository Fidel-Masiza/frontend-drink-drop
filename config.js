import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Add this line to import Firestore
import 'firebase/compat/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCKUX1C7WKS6SGDJN9_hMgKaQWZclH5JuY",
  authDomain: "drink-drop-6cefb.firebaseapp.com",
  projectId: "drink-drop-6cefb",
  storageBucket: "drink-drop-6cefb.firebasestorage.app",
  messagingSenderId: "416004195290",
  appId: "1:416004195290:web:433067164ec14c82ddb6e3",
  measurementId: "G-HS1BR9G1E4"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export default firebase;