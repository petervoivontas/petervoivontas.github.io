import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAVc3qH8zxYsTJH_z1lolHMHoeP81oxc8c",
    authDomain: "nuntium-d230a.firebaseapp.com",
    databaseURL: "https://nuntium-d230a.firebaseio.com",
    projectId: "nuntium-d230a",
    storageBucket: "nuntium-d230a.appspot.com",
    messagingSenderId: "888405293772"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;