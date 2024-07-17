'use client'
import React, { useContext } from 'react';
import { WatchedVideosContext, WatchedVideosContextType } from './WatchedVideosContext';

interface ClientWatchedVideoWrapperProps {
  children: React.ReactNode;
}

const ClientWatchedVideoWrapper: React.FC<ClientWatchedVideoWrapperProps> = ({ children }) => {
  const { watchedVideos, addWatchedVideo } = useContext(WatchedVideosContext);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Clone the child element and pass down the context as props
          return React.cloneElement(child, { watchedVideos, addWatchedVideo });
        }
        return child;
      })}
    </>
  );
};

export default ClientWatchedVideoWrapper;
