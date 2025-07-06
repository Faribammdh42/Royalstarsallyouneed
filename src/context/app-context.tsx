'use client';

import * as React from 'react';

export interface AiTrack {
  title: string;
  artist: string;
  imageUrl: string;
  dataAiHint?: string;
  audioUrl: string;
}

interface AppContextType {
  aiTracks: AiTrack[];
  addAiTrack: (track: AiTrack) => void;
  activeTrack: AiTrack | null;
  playTrack: (track: AiTrack) => void;
  setActiveTrack: (track: AiTrack | null) => void;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [aiTracks, setAiTracks] = React.useState<AiTrack[]>([]);
  const [activeTrack, setActiveTrack] = React.useState<AiTrack | null>(null);

  const addAiTrack = (track: AiTrack) => {
    setAiTracks(prevTracks => [track, ...prevTracks]);
  };
  
  const playTrack = (track: AiTrack) => {
    setActiveTrack(track);
  };

  const value = {
    aiTracks,
    addAiTrack,
    activeTrack,
    playTrack,
    setActiveTrack,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
