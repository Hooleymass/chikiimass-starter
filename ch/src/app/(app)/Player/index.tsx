'use client';
import ReactPlayer from 'react-player';
import Controls from './Controls';
import './Player.css';
import { formatTime } from './formatTime';
import { useRef, useState } from 'react';

const Player: React.FC = () => {
  const videoPlayerRef = useRef<ReactPlayer>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    buffer: true,
  });

  const { playing, muted, volume, played, seeking, buffer } = videoState;

  const playPauseHandler = () => {
    setVideoState((prevState) => ({ ...prevState, playing: !prevState.playing }));
  };

  const rewindHandler = () => {
    videoPlayerRef.current?.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
  };

  const fastForwardHandler = () => {
    videoPlayerRef.current?.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
  };

  const progressHandler = (state: any) => {
    if (!seeking) {
      setVideoState((prevState) => ({ ...prevState, ...state }));
    }
  };

  const seekHandler = (e: React.ChangeEvent<HTMLInputElement>, value: number) => {
    setVideoState((prevState) => ({ ...prevState, played: value / 100 }));
  };

  const seekMouseUpHandler = (e: React.MouseEvent<HTMLInputElement>, value: number) => {
    setVideoState((prevState) => ({ ...prevState, seeking: false }));
    videoPlayerRef.current?.seekTo(value / 100);
  };

  const volumeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, value: number) => {
    const newVolume = value / 100;
    setVideoState((prevState) => ({
      ...prevState,
      volume: newVolume,
      muted: newVolume === 0,
    }));
  };

  const volumeSeekUpHandler = (e: React.MouseEvent<HTMLInputElement>, value: number) => {
    const newVolume = value / 100;
    setVideoState((prevState) => ({
      ...prevState,
      volume: newVolume,
      muted: newVolume === 0,
    }));
  };

  const muteHandler = () => {
    setVideoState((prevState) => ({ ...prevState, muted: !prevState.muted }));
  };

  const currentTime = videoPlayerRef.current ? videoPlayerRef.current.getCurrentTime() : 0;
  const duration = videoPlayerRef.current ? videoPlayerRef.current.getDuration() : 0;
  const formatCurrentTime = formatTime(currentTime);
  const formatDuration = formatTime(duration);

  let count = 0;

  const mouseMoveHandler = () => {
    controlRef.current!.style.visibility = 'visible';
    count = 0;
  };

  const bufferStartHandler = () => {
    console.log('Buffering...');
    setVideoState((prevState) => ({ ...prevState, buffer: true }));
  };

  const bufferEndHandler = () => {
    console.log('Buffering stopped, play');
    setVideoState((prevState) => ({ ...prevState, buffer: false }));
  };

  return (
    <div className="video__container" onMouseMove={mouseMoveHandler}>
      <ReactPlayer
        ref={videoPlayerRef}
        className="player"
        url="http://localhost:8003/EP.10.v1.1717697110.480p.mp4"
        width="100%"
        height="100%"
        playing={playing}
        muted={muted}
        onProgress={progressHandler}
        onBuffer={bufferStartHandler}
        onBufferEnd={bufferEndHandler}
      />
      <Controls
        controlRef={controlRef}
        onPlayPause={playPauseHandler}
        playing={playing}
        onRewind={rewindHandler}
        onForward={fastForwardHandler}
        played={played}
        onSeek={seekHandler}
        onSeekMouseUp={seekMouseUpHandler}
        volume={volume}
        onVolumeChangeHandler={volumeChangeHandler}
        onVolumeSeekUp={volumeSeekUpHandler}
        mute={muted}
        onMute={muteHandler}
        duration={formatDuration}
        currentTime={formatCurrentTime}
      />
      {buffer && <p>Loading...</p>}
    </div>
  );
};

export default Player;