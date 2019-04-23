import firebase from 'firebase'


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

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;