import { useState, useEffect } from 'react';
import { 
  createUser, 
  getUser, 
  createSong, 
  getUserSongs, 
  createMoment, 
  getMoments,
  createFamily,
  getFamilies,
  sendGift
} from '@/lib/database';

export const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsync = async (operation: () => Promise<any>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await operation();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    // User operations
    createUser: (userData: any) => handleAsync(() => createUser(userData)),
    getUser: (userId: string) => handleAsync(() => getUser(userId)),
    
    // Song operations
    createSong: (songData: any) => handleAsync(() => createSong(songData)),
    getUserSongs: (userId: string) => handleAsync(() => getUserSongs(userId)),
    
    // Moment operations
    createMoment: (momentData: any) => handleAsync(() => createMoment(momentData)),
    getMoments: () => handleAsync(() => getMoments()),
    
    // Family operations
    createFamily: (familyData: any) => handleAsync(() => createFamily(familyData)),
    getFamilies: () => handleAsync(() => getFamilies()),
    
    // Gift operations
    sendGift: (giftData: any) => handleAsync(() => sendGift(giftData))
  };
};