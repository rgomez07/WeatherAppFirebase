import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCqRRV6iefSRBqMEz2ohInto7ZaPgYr390',
  authDomain: 'weatherapp-rigo.firebaseapp.com',
  projectId: 'weatherapp-rigo',
  storageBucket: 'weatherapp-rigo.appspot.com',
  messagingSenderId: '296778369788',
  appId: '1:296778369788:web:789afc44ffca1ed5d66579',
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
