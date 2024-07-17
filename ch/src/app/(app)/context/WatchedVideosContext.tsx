'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface WatchedVideo {
  seriesName: string;
  seasonNumber: string;
  episodeNumber: string;
  episodeTitle: string;
  poster: { url: string; alt: string };
  createdAt: string;
}

interface WatchedVideosContextType {
  watchedVideos: WatchedVideo[];
  addWatchedVideo: (video: WatchedVideo) => void;
}

const WatchedVideosContext = createContext<WatchedVideosContextType | undefined>(undefined);

const WatchedVideosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [watchedVideos, setWatchedVideos] = useState<WatchedVideo[]>([]);

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem('watchedVideos') || '[]');
    setWatchedVideos(storedVideos);
  }, []);

  const addWatchedVideo = (video: WatchedVideo) => {
    setWatchedVideos((prevVideos) => {
      const existingIndex = prevVideos.findIndex(
        (v) =>
          v.seriesName === video.seriesName &&
          v.seasonNumber === video.seasonNumber &&
          v.episodeNumber === video.episodeNumber
      );

      let updatedVideos;
      if (existingIndex !== -1) {
        // Move the existing video to the first position
        updatedVideos = [
          video,
          ...prevVideos.slice(0, existingIndex),
          ...prevVideos.slice(existingIndex + 1),
        ];
      } else {
        // Add new video to the beginning
        updatedVideos = [video, ...prevVideos];
      }

      localStorage.setItem('watchedVideos', JSON.stringify(updatedVideos));
      return updatedVideos;
    });
  };

  return (
    <WatchedVideosContext.Provider value={{ watchedVideos, addWatchedVideo }}>
      {children}
    </WatchedVideosContext.Provider>
  );
};

export { WatchedVideosProvider, WatchedVideosContext };
