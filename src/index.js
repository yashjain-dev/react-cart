import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpV5RjjY4CCb95eNLQBppvN1f9DyQxlSw",
  authDomain: "cart-13d12.firebaseapp.com",
  projectId: "cart-13d12",
  storageBucket: "cart-13d12.appspot.com",
  messagingSenderId: "881861990787",
  appId: "1:881861990787:web:6434070fa74e9a79447eb6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


