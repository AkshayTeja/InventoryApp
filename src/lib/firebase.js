// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRdkpBnyG6DhRYj4y25_eq3vC6zUxgYEA",
  authDomain: "inventory-management-app-5f20a.firebaseapp.com",
  projectId: "inventory-management-app-5f20a",
  storageBucket: "inventory-management-app-5f20a.appspot.com",
  messagingSenderId: "816184279527",
  appId: "1:816184279527:web:354b31bc502d2f4d3e7d42",
  measurementId: "G-074Y6RDTDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics only on the client side
let analytics = null;
if (typeof window !== 'undefined') {
  import('firebase/analytics').then((module) => {
    const { getAnalytics } = module;
    analytics = getAnalytics(app);
  });
}