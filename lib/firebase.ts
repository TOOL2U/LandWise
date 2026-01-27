import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

// Only initialize Firebase if config is provided
const isConfigured = firebaseConfig.apiKey && firebaseConfig.projectId;

// Initialize Firebase (avoid multiple initializations)
const app = isConfigured && getApps().length === 0 
  ? initializeApp(firebaseConfig) 
  : getApps()[0];

export const db = isConfigured ? getFirestore(app) : null;
export const auth = isConfigured ? getAuth(app) : null;
export const isFirebaseConfigured = isConfigured;
export default app;
