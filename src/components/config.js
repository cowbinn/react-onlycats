import firebase from "firebase/app";
import "firebase/storage";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB9rC0qRG6-qYO1JcAaES98rLq-TlhVoVE",
    authDomain: "onlycats2-4d448.firebaseapp.com",
    databaseURL: "https://onlycats2-4d448-default-rtdb.firebaseio.com",
    projectId: "onlycats2-4d448",
    storageBucket: "onlycats2-4d448.appspot.com",
    messagingSenderId: "684644430823",
    appId: "1:684644430823:web:e86817bc0eafe298f0c342"
};

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage();
const db = firebase.firestore();
export { storage, db, firebase as default};