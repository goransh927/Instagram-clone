import firebase from 'firebase';

const firebaseApp=firebase.initializeApp(
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
{
    apiKey: "AIzaSyDqeoZw8nPpp-kMi3cN_yeAd-M36psIpbQ",
    authDomain: "instagram-clone-a879b.firebaseapp.com",
    databaseURL: "https://instagram-clone-a879b.firebaseio.com",
    projectId: "instagram-clone-a879b",
    storageBucket: "instagram-clone-a879b.appspot.com",
    messagingSenderId: "428996739655",
    appId: "1:428996739655:web:0db06c10089bd6873e2762",
    measurementId: "G-81WGGPR6E8"
  }
);

const db =firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};