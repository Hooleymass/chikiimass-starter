import { memo } from 'react';

import Btn from '../Btn';
import  PlayIcon  from '../../../icons/play.svg';
import  PauseIcon  from '../../../icons/pause.svg';
import { Pause, Play } from 'lucide-react';

interface PlaybackProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const Playback: React.FC<PlaybackProps> = ({ isPlaying, onToggle }) => (
  <Btn label={isPlaying ? 'Pause' : 'Play'} onClick={onToggle}>
    {isPlaying ? <Pause /> : <Play />}
  </Btn>
);

export default memo(Playback);
