import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User 
} from 'firebase/auth';
import { auth, db, storage } from './firebase-config';

export interface SongData {
  id?: string;
  title: string;
  artist: string;
  audioUrl: string;
  userId: string;
  pitchScore?: number;
  timingScore?: number;
  effects?: string;
  aiEnhancement?: boolean;
  lyrics?: string;
  createdAt: Date;
}

export class FirebaseService {
  // Auth
  static async signUp(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  static async signIn(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  static async signOut() {
    return await signOut(auth);
  }

  // Storage
  static async uploadAudio(file: File, userId: string): Promise<string> {
    const fileName = `songs/${userId}/${Date.now()}.mp3`;
    const storageRef = ref(storage, fileName);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  }

  // Firestore
  static async saveSong(songData: SongData): Promise<string> {
    const docRef = await addDoc(collection(db, 'songs'), songData);
    return docRef.id;
  }

  static async getUserSongs(userId: string): Promise<SongData[]> {
    const q = query(
      collection(db, 'songs'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as SongData));
  }

  static async getPublicSongs(limitCount = 20): Promise<SongData[]> {
    const q = query(
      collection(db, 'songs'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as SongData));
  }

  static async likeSong(songId: string, userId: string): Promise<void> {
    await addDoc(collection(db, 'likes'), {
      songId,
      userId,
      createdAt: new Date()
    });
  }
}