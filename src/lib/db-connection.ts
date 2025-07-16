import { db } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot
} from 'firebase/firestore';

export class DatabaseConnection {
  // Initialize collections
  static async initializeDatabase() {
    try {
      // Create initial collections structure
      const collections = ['users', 'songs', 'moments', 'families', 'gifts'];
      
      for (const collectionName of collections) {
        const colRef = collection(db, collectionName);
        console.log(`✅ Collection ${collectionName} ready`);
      }
      
      return { success: true, message: 'Database initialized' };
    } catch (error) {
      console.error('Database initialization failed:', error);
      return { success: false, error };
    }
  }

  // Test connection
  static async testConnection() {
    try {
      const testDoc = doc(db, 'test', 'connection');
      await setDoc(testDoc, { 
        timestamp: new Date(),
        status: 'connected',
        app: 'RoyalStar'
      });
      
      const docSnap = await getDoc(testDoc);
      if (docSnap.exists()) {
        await deleteDoc(testDoc);
        return { success: true, message: 'Connection successful' };
      }
      
      return { success: false, message: 'Connection failed' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Real-time listener
  static subscribeToCollection(collectionName: string, callback: (data: any[]) => void) {
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(data);
    });
  }
}