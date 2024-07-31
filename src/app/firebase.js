import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBRdkpBnyG6DhRYj4y25_eq3vC6zUxgYEA",
    authDomain: "inventory-management-app-5f20a.firebaseapp.com",
    projectId: "inventory-management-app-5f20a",
    storageBucket: "inventory-management-app-5f20a.appspot.com",
    messagingSenderId: "816184279527",
    appId: "1:816184279527:web:354b31bc502d2f4d3e7d42",
    measurementId: "G-074Y6RDTDS"
  };
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };