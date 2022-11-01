// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import {getDatabase} from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCuCAz3rhAdpa8KRD5Br9mrvra8s4cZ640',
  authDomain: 'pamrym-25ba8.firebaseapp.com',
  databaseURL: 'https://pamrym-25ba8-default-rtdb.firebaseio.com',
  projectId: 'pamrym-25ba8',
  storageBucket: 'pamrym-25ba8.appspot.com',
  messagingSenderId: '596975951917',
  appId: '1:596975951917:web:92ab442d323cde88de18a4',
};

// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);

export default app;
