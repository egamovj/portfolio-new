import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBEEBxwWQLTO0hnLIKjLVBKIcHkPl33B0U",
    authDomain: "yariga-426307.firebaseapp.com",
    projectId: "yariga-426307",
    storageBucket: "yariga-426307.firebasestorage.app",
    messagingSenderId: "992049811892",
    appId: "1:992049811892:web:40b6645d0037c20297e2e1",
    measurementId: "G-20TBENZBSY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
