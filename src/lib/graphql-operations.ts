import { generateClient } from 'aws-amplify/api';

const client = generateClient();

// Queries
export const GET_USER_SONGS = `
  query GetUserSongs($userId: ID!) {
    listSongs(filter: { userId: { eq: $userId } }) {
      items {
        id
        title
        artist
        audioUrl
        coverImage
        pitchScore
        timingScore
        aiEnhancement
        effects
        recordings
        createdAt
      }
    }
  }
`;

export const GET_PUBLIC_SONGS = `
  query GetPublicSongs($limit: Int, $nextToken: String) {
    listSongs(filter: { isPublic: { eq: true } }, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        artist
        audioUrl
        coverImage
        recordings
        user {
          username
          profileImage
        }
        createdAt
      }
      nextToken
    }
  }
`;

export const GET_SONG_LYRICS = `
  query GetSongLyrics($songId: ID!) {
    listLyrics(filter: { songId: { eq: $songId } }) {
      items {
        id
        syncedLyrics
        language
      }
    }
  }
`;

// Mutations
export const UPLOAD_SONG = `
  mutation UploadSong($input: UploadSongInput!) {
    uploadSong(input: $input) {
      songId
      audioUrl
      status
      analysis {
        pitchScore
        timingScore
        qualityScore
      }
    }
  }
`;

export const ANALYZE_VOICE = `
  mutation AnalyzeVoice($audioUrl: String!) {
    analyzeVoice(audioUrl: $audioUrl) {
      pitchScore
      timingScore
      qualityScore
      recommendations
    }
  }
`;

export const APPLY_AI_EFFECTS = `
  mutation ApplyAIEffects($input: AIEffectsInput!) {
    applyAIEffects(input: $input) {
      processedAudioUrl
      effects
      status
    }
  }
`;

export const CREATE_LIKE = `
  mutation CreateLike($input: CreateLikeInput!) {
    createLike(input: $input) {
      id
      userId
      songId
      createdAt
    }
  }
`;

export const DELETE_LIKE = `
  mutation DeleteLike($input: DeleteLikeInput!) {
    deleteLike(input: $input) {
      id
    }
  }
`;

// GraphQL Client Functions
export const graphqlOperations = {
  // Queries
  async getUserSongs(userId: string) {
    const result = await client.graphql({
      query: GET_USER_SONGS,
      variables: { userId }
    });
    return result.data.listSongs.items;
  },

  async getPublicSongs(limit = 20, nextToken?: string) {
    const result = await client.graphql({
      query: GET_PUBLIC_SONGS,
      variables: { limit, nextToken }
    });
    return result.data.listSongs;
  },

  async getSongLyrics(songId: string) {
    const result = await client.graphql({
      query: GET_SONG_LYRICS,
      variables: { songId }
    });
    return result.data.listLyrics.items[0];
  },

  // Mutations
  async uploadSong(input: any) {
    const result = await client.graphql({
      query: UPLOAD_SONG,
      variables: { input }
    });
    return result.data.uploadSong;
  },

  async analyzeVoice(audioUrl: string) {
    const result = await client.graphql({
      query: ANALYZE_VOICE,
      variables: { audioUrl }
    });
    return result.data.analyzeVoice;
  },

  async applyAIEffects(input: any) {
    const result = await client.graphql({
      query: APPLY_AI_EFFECTS,
      variables: { input }
    });
    return result.data.applyAIEffects;
  },

  async createLike(songId: string, userId: string) {
    const result = await client.graphql({
      query: CREATE_LIKE,
      variables: { input: { songId, userId } }
    });
    return result.data.createLike;
  },

  async deleteLike(id: string) {
    const result = await client.graphql({
      query: DELETE_LIKE,
      variables: { input: { id } }
    });
    return result.data.deleteLike;
  }
};