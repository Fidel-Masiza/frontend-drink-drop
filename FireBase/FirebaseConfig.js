import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Add this line to import Firestore
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA2zy1IWWo68dESInyEPp3T5TMLY4QzAyk",
  authDomain: "fooodapp-8243b.firebaseapp.com",
  projectId: "fooodapp-8243b",
  storageBucket: "fooodapp-8243b.appspot.com",
  messagingSenderId: "9804258675",
  appId: "1:9804258675:web:acfa69f8ac03a4746b7906"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase }; 

