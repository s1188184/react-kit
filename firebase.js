// import firebase from 'firebase';
// import firebase from 'firebase/app';;
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyC7hxPayceWMopNlv98izCjmr9IHbx6RiA",
  authDomain: "kings-island-tracker.firebaseapp.com",
  databaseURL: "https://kings-island-tracker.firebaseio.com",
  projectId: "kings-island-tracker",
  storageBucket: "kings-island-tracker.appspot.com",
  messagingSenderId: "325930569325"
};
firebase.initializeApp(config);

debugger;

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;

