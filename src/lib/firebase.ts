import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged as firebaseOnAuthStateChanged
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfigLocal from '../../firebase-applet-config.json';

const localApiKey = firebaseConfigLocal.apiKey;
const envApiKey = import.meta.env.VITE_FIREBASE_API_KEY;

// If the local API key is explicitly empty, we respect that the user removed it and do not use the env key fallback.
const finalApiKey = (localApiKey === "") ? "" : (envApiKey || localApiKey || "");

const firebaseConfig = {
  apiKey: finalApiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigLocal.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfigLocal.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfigLocal.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigLocal.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfigLocal.appId,
};

export const isFirebaseConfigured = !!(firebaseConfig.apiKey && firebaseConfig.apiKey.trim() !== "" && firebaseConfig.apiKey.startsWith("AIza"));

let appInstance: any = null;
let authInstance: any = null;
let dbInstance: any = null;
let googleProviderInstance: any = null;

// Simulated/Mock State for development when Firebase is not configured
let mockUser: any = null;
const listeners = new Set<(user: any) => void>();

if (isFirebaseConfigured) {
  try {
    appInstance = initializeApp(firebaseConfig);
    authInstance = getAuth(appInstance);
    dbInstance = getFirestore(appInstance, import.meta.env.VITE_FIREBASE_FIRESTORE_DB_ID || firebaseConfigLocal.firestoreDatabaseId);
    googleProviderInstance = new GoogleAuthProvider();
  } catch (error) {
    console.warn("Firebase SDK initialization status: Utilizing standard simulation fallback mode.");
    appInstance = null;
    authInstance = null;
    dbInstance = null;
    googleProviderInstance = null;
  }
} else {
  console.log("Firebase is disabled or API Key was removed. Running in secure local-simulation mode.");
}

export const app = appInstance;
export const auth = authInstance;
export const db = dbInstance;
export const googleProvider = googleProviderInstance;

// Intercept functional helpers to support mocked Auth cleanly when API key is missing
export const signInWithGoogle = async () => {
  if (isFirebaseConfigured && authInstance && googleProviderInstance) {
    return signInWithPopup(authInstance, googleProviderInstance);
  } else {
    console.log("Firebase is not configured. Simulating Google Login...");
    mockUser = {
      uid: 'mansvi-fabrics-mock-uid',
      email: firebaseConfigLocal.projectId ? `${firebaseConfigLocal.projectId}@developer.com` : 'developer@mansvifabrics.com',
      displayName: 'Mansvi Developer',
      photoURL: 'https://lh3.googleusercontent.com/d/183S5tq0hUBL47M-MzKiP1CvId72QsqvL',
      emailVerified: true,
      isAnonymous: false,
    };
    listeners.forEach(cb => cb(mockUser));
    return { user: mockUser };
  }
};

export const logOut = async () => {
  if (isFirebaseConfigured && authInstance) {
    return signOut(authInstance);
  } else {
    console.log("Firebase is not configured. Simulating Logout...");
    mockUser = null;
    listeners.forEach(cb => cb(mockUser));
  }
};

export const onAuthStateChanged = (
  authRef: any,
  callback: (user: any) => void
) => {
  if (isFirebaseConfigured && authRef) {
    return firebaseOnAuthStateChanged(authRef, callback);
  } else {
    // Trigger immediate call for initial mock subscription state
    callback(mockUser);
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  }
};
