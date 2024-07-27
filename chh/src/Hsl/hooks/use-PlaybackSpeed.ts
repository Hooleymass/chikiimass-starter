import { useState, useEffect } from "react";

const usePlaybackSpeed = (playerRef: React.RefObject<HTMLVideoElement>) => {
  const [speed, setSpeed] = useState<number>(1);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.playbackRate = speed;
    }
  }, [speed, playerRef]);

  return [speed, setSpeed] as const;
};

export default usePlaybackSpeed;
