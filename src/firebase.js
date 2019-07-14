import firebase from "@firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";
import "firebase/storage";

// Initialize firebase
var firebaseConfig = {
    apiKey: "AIzaSyCAxLaxEY0BrMWoltlP_OSh3eGinDkqKUU",
    authDomain: "vue-organizer.firebaseapp.com",
    databaseURL: "https://vue-organizer.firebaseio.com",
    projectId: "vue-organizer",
    storageBucket: "vue-organizer.appspot.com",
    messagingSenderId: "737054375284",
    appId: "1:737054375284:web:a0b6642ac60ee3a2"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { fb, db };
