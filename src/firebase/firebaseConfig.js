import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
 
const firebaseConfig = {
    apiKey: "AIzaSyDIcQoBv5zIzoX8ji1JxUheKqnDooN4Apk",
    authDomain: "writenode-aymeric.firebaseapp.com",
    projectId: "writenode-aymeric",
    storageBucket: "writenode-aymeric.appspot.com",
    messagingSenderId: "443212495595",
    appId: "1:443212495595:web:1aac54eff74132bd681cae",
    measurementId: "G-DPWPK0Z9R1"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

export {
    db,
    auth
}