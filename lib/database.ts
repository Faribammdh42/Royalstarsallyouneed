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
import { db } from './firebase';

// User Management
export const createUser = async (userData: any) => {
  return await addDoc(collection(db, 'users'), userData);
};

export const getUser = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  return await getDoc(docRef);
};

// Songs Management
export const createSong = async (songData: any) => {
  return await addDoc(collection(db, 'songs'), songData);
};

export const getUserSongs = async (userId: string) => {
  const q = query(
    collection(db, 'songs'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  return await getDocs(q);
};

// Moments Management
export const createMoment = async (momentData: any) => {
  return await addDoc(collection(db, 'moments'), momentData);
};

export const getMoments = async () => {
  const q = query(
    collection(db, 'moments'),
    orderBy('createdAt', 'desc'),
    limit(20)
  );
  return await getDocs(q);
};

// Families Management
export const createFamily = async (familyData: any) => {
  return await addDoc(collection(db, 'families'), familyData);
};

export const getFamilies = async () => {
  const q = query(collection(db, 'families'), orderBy('rank', 'asc'));
  return await getDocs(q);
};

// Gifts Management
export const sendGift = async (giftData: any) => {
  return await addDoc(collection(db, 'gifts'), giftData);
};