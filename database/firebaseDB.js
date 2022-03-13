import * as firebase from "firebase";
import 'firebase/storage';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4dabg8R1LvD2DrOGntxhQglfb-otYX7Y",
  authDomain: "savemon-auth.firebaseapp.com",
  databaseURL: "https://savemon-auth-default-rtdb.firebaseio.com",
  projectId: "savemon-auth",
  storageBucket: "savemon-auth.appspot.com",
  messagingSenderId: "939310137689",
  appId: "1:939310137689:web:10a777dfa4a3cd8bec4c48",
  measurementId: "G-P7LS36MCMM"
};

let app;
if (firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {auth , db , storage};