import firebase from "firebase/app";
import "firebase/storage";
import 'firebase/firestore';

const firebaseConfig = {
    
};

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage();
const db = firebase.firestore();
export { storage, db, firebase as default};