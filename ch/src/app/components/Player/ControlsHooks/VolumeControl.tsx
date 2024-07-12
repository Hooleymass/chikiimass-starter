import React from "react";

interface VolumeControlProps {
  volumeState: number;
  volumeInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleMuteHandler: () => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volumeState,
  volumeInputHandler,
  toggleMuteHandler,
}) => {
  return (
    <div>
      {/* Implement your volume control UI here */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volumeState}
        onChange={volumeInputHandler}
      />
      <button onClick={toggleMuteHandler}>Mute</button>
    </div>
  );
};

export default VolumeControl;
