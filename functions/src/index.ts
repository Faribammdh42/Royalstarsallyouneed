import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const analyzeAudio = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { audioUrl } = data;
  
  // Mock voice analysis
  const pitchScore = Math.floor(Math.random() * 40) + 60;
  const timingScore = Math.floor(Math.random() * 30) + 70;
  
  return {
    pitchScore,
    timingScore,
    qualityScore: (pitchScore + timingScore) / 2,
    recommendations: pitchScore < 70 ? ['Practice pitch control'] : ['Great job!']
  };
});

export const processRecording = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const userId = filePath?.split('/')[1];
  
  if (!filePath?.includes('songs/') || !userId) return;
  
  // Update song metadata in Firestore
  const songsRef = admin.firestore().collection('songs');
  const query = songsRef.where('userId', '==', userId).orderBy('createdAt', 'desc').limit(1);
  const snapshot = await query.get();
  
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    await doc.ref.update({
      processed: true,
      processedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
});

export const sendNotification = functions.firestore.document('likes/{likeId}').onCreate(async (snap, context) => {
  const like = snap.data();
  const songDoc = await admin.firestore().doc(`songs/${like.songId}`).get();
  const song = songDoc.data();
  
  if (song && song.userId !== like.userId) {
    await admin.firestore().collection('notifications').add({
      userId: song.userId,
      type: 'like',
      message: `Someone liked your song "${song.title}"`,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      read: false
    });
  }
});