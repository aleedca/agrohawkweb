import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeX8uSPIo6XLcmECqmr8m0RiddEiD7h6I",
  authDomain: "gestion-clientes-agrohawk.firebaseapp.com",
  projectId: "gestion-clientes-agrohawk",
  storageBucket: "gestion-clientes-agrohawk.appspot.com",
  messagingSenderId: "715665881187",
  appId: "1:715665881187:web:c7fdc40fa978bd64c96056"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export default firestore;