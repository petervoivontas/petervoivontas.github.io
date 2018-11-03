import { auth } from './firebase';

export const signup = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password);
}