import { auth } from './firebase';
import firebase from 'firebase'
const firestore = firebase.firestore();

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
    auth.signInWithEmailAndPassword(email, password);
    const docRef = firestore.doc(`users/${email}`);
    docRef.get().then(doc => {
        if (doc.exists) {
            const docUsername = doc.username;
            const docEmail = doc.email;
            console.log(doc);
            console.log(`The user's username is ${docUsername}`);
            window.localStorage.setItem('username', docUsername);
            window.localStorage.setItem('email', docEmail);
        }
    }).catch(error => {
        console.log(`Error during login: ${error}`);
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