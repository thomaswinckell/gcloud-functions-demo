import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDOGjd6yeygqFOS85C9AfBOngxDPsAfblA",
    authDomain: "functions-demo-206213.firebaseapp.com",
    databaseURL: "https://functions-demo-206213.firebaseio.com",
    projectId: "functions-demo-206213",
    storageBucket: "functions-demo-206213.appspot.com",
    messagingSenderId: "572554680105"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
