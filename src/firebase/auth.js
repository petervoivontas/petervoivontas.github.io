import { auth } from './firebase';
import firebase from 'firebase';
import profileimg from '../icons/profileimg.jpg';
const firestore = firebase.firestore();
const storageRef = firebase.storage().ref();

export const signup = (username, email, password) => {
    auth.createUserWithEmailAndPassword(email, password);
    window.localStorage.setItem('username', username);
    window.localStorage.setItem('email', email);
    const docRef = firestore.doc(`users/${email}`);
    docRef.set({
        username: username,
        email: email
    }).then(() => {
        console.log('User signed up');
    }).catch(error => {
        console.log(error);
    });
}

export const signIn = (email, password) => {
    auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            console.log(`Error during login: ${error}`);
        });
    const docRef = firestore.doc(`users/${email}`);
    docRef.get().then(doc => {
        if (doc.exists) {
            const docUsername = doc.get('username');
            const docEmail = doc.get('email');
            console.log(`The user's username is ${docUsername}`);
            console.log(`The user's email is ${docEmail}`);
            window.localStorage.setItem('username', docUsername);
            window.localStorage.setItem('email', docEmail);
            storageRef.child('images/profileimg').put(profileimg);

        }
    }).catch(error => {
        console.log(`Error during retrieving document reference: ${error}`);
    });
}

export const signOut = () => {
    auth.signOut()
        .then(() => {
            console.log('Signing out successful');
        })
        .catch(error => {
            console.log(error);
        })
}