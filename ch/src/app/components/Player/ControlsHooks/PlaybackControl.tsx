import React from "react";

interface PlaybackControlProps {
  playbackState: boolean;
  togglePlayHandler: () => void;
  showControlsHandler: () => void;
}

const PlaybackControl: React.FC<PlaybackControlProps> = ({
  playbackState,
  togglePlayHandler,
  showControlsHandler,
}) => {
  return (
    <div>
      {/* Implement your playback control UI here */}
      <button onClick={togglePlayHandler}>
        {playbackState ? "Pause" : "Play"}
      </button>
      {/* Example of showing controls */}
      <button onClick={showControlsHandler}>Show Controls</button>
    </div>
  );
};

export default PlaybackControl;
