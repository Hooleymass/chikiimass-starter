import React from 'react';
import './controls.css';
import { Pause, FastForward, Rewind, Play, Volume, FastForwardIcon, Volume2 } from 'lucide-react';

interface ControlsProps {
  onPlayPause: () => void;
  playing: boolean;
  onRewind: () => void;
  onForward: () => void;
  played: number;
  onSeekMouseUp: (e: React.MouseEvent<HTMLInputElement>, value: number) => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>, value: number) => void;
  volume: number;
  onVolumeChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, value: number) => void;
  onVolumeSeekUp: (e: React.MouseEvent<HTMLInputElement>, value: number) => void;
  onMute: () => void;
  mute: boolean;
  currentTime: string;
  duration: string;
  controlRef: React.RefObject<HTMLDivElement>;
}

const Controls: React.FC<ControlsProps> = ({
  onPlayPause,
  playing,
  onRewind,
  onForward,
  played,
  onSeekMouseUp,
  onSeek,
  volume,
  onVolumeChangeHandler,
  onVolumeSeekUp,
  onMute,
  mute,
  currentTime,
  duration,
  controlRef
}) => {
  return (
    <div className="control_Container" ref={controlRef}>
      <div className="top_container">
        <h2>Video Player</h2>
      </div>
      <div className="mid__container">
        <div className="icon__btn" onDoubleClick={onRewind}>
          <Rewind fontSize="medium" />
        </div>
        <div className="icon__btn" onClick={onPlayPause}>
          {playing ? <Pause fontSize="medium" /> : <Play fontSize="medium" />}
        </div>
        <div className="icon__btn" onDoubleClick={onForward}>
          <FastForward fontSize="medium" />
        </div>
      </div>
      <div className="bottom__container">
        <div className="slider__container">
          <input
            type="range"
            min="0"
            max="100"
            value={played * 100}
            onChange={(e) => onSeek(e, parseFloat(e.target.value))}
            onMouseUp={(e) => onSeekMouseUp(e, parseFloat((e.target as HTMLInputElement).value))}
            className="progress-bar"
          />
        </div>
        <div className="control__box">
          <div className="inner__controls">
            <div className="icon__btn" onClick={onPlayPause}>
              {playing ? <Pause fontSize="medium" /> : <Play fontSize="medium" />}
            </div>
            <div className="icon__btn" onDoubleClick={onForward}>
              <FastForwardIcon fontSize="medium" />
            </div>
            <div className="icon__btn" onClick={onMute}>
              {mute ? <Volume fontSize="medium" /> : <Volume2 fontSize="medium" />}
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChangeHandler(e, parseFloat(e.target.value))}
              onMouseUp={(e) => onVolumeSeekUp(e, parseFloat((e.target as HTMLInputElement).value))}
              className="volume-slider"
            />
            <span>{currentTime} / {duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
