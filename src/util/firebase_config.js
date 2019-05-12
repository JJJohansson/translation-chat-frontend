import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebase_config = {
  apiKey: "AIzaSyCCbYj9tr5__78_cyn3dEjR1sW1KTyLuhM",
  authDomain: "broken-telephone-chat.firebaseapp.com",
  databaseURL: "https://broken-telephone-chat.firebaseio.com",
  projectId: "broken-telephone-chat",
  storageBucket: "broken-telephone-chat.appspot.com",
  messagingSenderId: "469972233102",
  appId: "1:469972233102:web:7d6706fd13723223"
};


// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebase_config);

export { firebaseApp };
