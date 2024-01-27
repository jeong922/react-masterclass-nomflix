import { initializeApp } from 'firebase/app';
import {
  onAuthStateChanged,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback: (arg: User | null) => void) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
