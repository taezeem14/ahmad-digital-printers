import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

export const firebaseConfig = {
  apiKey: "AIzaSyB8L273UpTFQmH1ZeKV9jClQJvNkmX6E80",
  authDomain: "ahmad-digital-printers.firebaseapp.com",
  projectId: "ahmad-digital-printers",
  storageBucket: "ahmad-digital-printers.firebasestorage.app",
  messagingSenderId: "954546069285",
  appId: "1:954546069285:web:b855c8f4f3b5ddcd7ec4cc",
  measurementId: "G-B6NFCQCQW1"
};

// Initialize Firebase safely
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const rtdb = getDatabase(app);

export default app;
