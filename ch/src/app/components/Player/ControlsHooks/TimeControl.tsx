import React from "react";

interface TimeControlProps {
  currentTimeUI: string;
  remainedTimeUI: string;
  seekProgress: number;
  videoDuration: number;
}

const TimeControl: React.FC<TimeControlProps> = ({
  currentTimeUI,
  remainedTimeUI,
  seekProgress,
  videoDuration,
}) => {
  return (
    <div>
      {/* Implement your time control UI here */}
      <div>{currentTimeUI}</div>
      <div>{remainedTimeUI}</div>
      <progress value={seekProgress} max={100}></progress>
      <span>{videoDuration}</span>
    </div>
  );
};

export default TimeControl;
