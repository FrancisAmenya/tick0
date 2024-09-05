import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const logIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
