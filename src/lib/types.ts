export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  rank: number;
  coins: number;
  familyId?: string;
  createdAt: Date;
}

export interface Song {
  id: string;
  userId: string;
  title: string;
  genre: string;
  audioUrl: string;
  lyrics?: string;
  isAIGenerated: boolean;
  createdAt: Date;
}

export interface Moment {
  id: string;
  userId: string;
  songId: string;
  imageUrl: string;
  caption: string;
  likes: number;
  gifts: Gift[];
  createdAt: Date;
}

export interface Family {
  id: string;
  name: string;
  logo: string;
  members: string[];
  rank: number;
  totalScore: number;
  genre: string;
  createdAt: Date;
}

export interface Gift {
  id: string;
  name: string;
  icon: string;
  price: number;
  fromUserId: string;
  toUserId: string;
  momentId?: string;
  createdAt: Date;
}