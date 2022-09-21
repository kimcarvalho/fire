import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/compat/auth'

let firebaseConfig = {
  apiKey: "AIzaSyBYK8d3MQQlSUIb9g3c8TLEfvSr1VltVhI",
  authDomain: "vueapp-d479f.firebaseapp.com",
  projectId: "vueapp-d479f",
  storageBucket: "vueapp-d479f.appspot.com",
  messagingSenderId: "1024919359721",
  appId: "1:1024919359721:web:fff4661a79696c0d6be078",
  measurementId: "G-SQ6QFWQFQB"
};

firebase.initializeApp(firebaseConfig);
export default firebase;