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
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

// User Management
export const createUser = async (userData: any) => {
  const data = {
    ...userData,
    createdAt: serverTimestamp(),
    rank: 0,
    coins: 100
  };
  return await addDoc(collection(db, 'users'), data);
};

export const getUser = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  return await getDoc(docRef);
};

// Songs Management
export const createSong = async (songData: any) => {
  const data = {
    ...songData,
    createdAt: serverTimestamp()
  };
  return await addDoc(collection(db, 'songs'), data);
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
  const data = {
    ...momentData,
    createdAt: serverTimestamp(),
    likes: 0,
    gifts: []
  };
  return await addDoc(collection(db, 'moments'), data);
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
  const data = {
    ...familyData,
    createdAt: serverTimestamp(),
    members: [],
    totalScore: 0
  };
  return await addDoc(collection(db, 'families'), data);
};

export const getFamilies = async () => {
  const q = query(collection(db, 'families'), orderBy('totalScore', 'desc'));
  return await getDocs(q);
};

// Gifts Management
export const sendGift = async (giftData: any) => {
  const data = {
    ...giftData,
    createdAt: serverTimestamp()
  };
  return await addDoc(collection(db, 'gifts'), data);
};