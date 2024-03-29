import { child, get, getDatabase, ref, remove, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import {
  onAuthStateChanged,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  GithubAuthProvider,
} from 'firebase/auth';
import { GetContents } from './api';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const db = getDatabase(app);

export async function login(provider: string) {
  const authProvider = getProvider(provider);
  try {
    return await signInWithPopup(auth, authProvider);
  } catch (message) {
    return console.error(message);
  }
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback: (arg: User | null) => void) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export function addMyList(
  userId: string,
  id: number,
  content: GetContents,
  mediaType: string
) {
  return set(ref(db, `users/${userId}/${id}`), {
    mediaType: mediaType,
    ...content,
  });
}

export async function getMyList(userId: string) {
  const snapshot = await get(child(ref(db), `users/${userId}`));
  const data = snapshot.val() || {};
  return Object.values(data);
}

// TODO: myList 삭제 기능 구현
export function removeMyList(userId: string, id: number) {
  return remove(ref(db, `users/${userId}/${id}`));
}

export async function getMatchItem(userId: string, id: number) {
  const snapshot = await get(child(ref(db), `users/${userId}/${id}`));
  const data = snapshot.val() || {};
  return Object.values(data);
}

function getProvider(provider: string) {
  switch (provider) {
    case 'Google':
      return googleAuthProvider;
    case 'Github':
      return githubAuthProvider;
    default:
      throw new Error(`not supported provider: ${provider}`);
  }
}
