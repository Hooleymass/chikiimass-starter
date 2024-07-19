'use client'
import React, { useEffect, useRef, useState } from 'react';
import './Player.css';
import Controls from './Controls';

const Player = () => {
  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    Buffer: true
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  //const [isPlaying, setIsPlaying] = useState(false);

  //Destructuring the properties from the videoState
  const { playing, muted, volume, playbackRate, played, seeking, buffer } = videoState

  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing });
  };
  // Function to rewind video by 10 seconds
  const rewindHandler = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  // Function to fast-forward video by 10 seconds
  const fastFowardHandler = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  // Update video element's play/pause state
  useEffect(() => {
    if (videoRef.current) {
      playing ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [playing]);

console.log('video', videoRef.current)
  return (
    <div className="video__container">
      <video
        className="player"
        width="100%"
        height="100%"
        ref={videoRef}
        autoPlay
        muted={muted}
        onPlay={() => setVideoState(prevState => ({ ...prevState, playing: true }))}
        onPause={() => setVideoState(prevState => ({ ...prevState, playing: false }))}
      >
        <source src='http://localhost:8003/EP.10.v1.1717697110.480p.mp4' />
      </video>
      <Controls onPlayPause={playPauseHandler} playing={playing} onRewind={rewindHandler} onForward={fastFowardHandler} />
    </div>
  );
}

export default Player;
