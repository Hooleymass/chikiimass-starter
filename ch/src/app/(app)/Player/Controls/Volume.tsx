import { memo } from 'react';

import Btn from './Btn';
//import { ReactComponent as VolumeHighIcon } from 'icons/volume-high.svg';
//import { ReactComponent as VolumeMiddleIcon } from 'icons/volume-middle.svg';
//import { ReactComponent as VolumeLowIcon } from 'icons/volume-low.svg';
//import { ReactComponent as VolumeMuteIcon } from 'icons/volume-mute.svg';
import { Volume1 as VolumeMiddleIcon, Volume2 as VolumeHighIcon, VolumeIcon as VolumeLowIcon , VolumeX as VolumeMuteIcon  } from 'lucide-react';

interface VolumeProps {
  volume: number;
  onToggle: () => void;
  onSeek: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Volume: React.FC<VolumeProps> = ({ volume, onToggle, onSeek }) => {
  return (
    <div className="vp-volume">
      <Btn onClick={onToggle}>
        {volume > 0.7 && <VolumeHighIcon />}
        {volume <= 0.7 && volume > 0.3 && <VolumeMiddleIcon />}
        {volume <= 0.3 && volume > 0 && <VolumeLowIcon />}
        {volume === 0 && <VolumeMuteIcon />}
      </Btn>
      <div className="vp-volume__range">
        <div className="vp-volume__range--background" />
        <div
          className="vp-volume__range--current"
          style={{ width: `${volume * 100}%` }}
        >
          <div className="vp-volume__range--current__thumb" />
        </div>
        <input
          className="vp-volume__range--seek"
          type="range"
          value={volume}
          max="1"
          step="0.05"
          onChange={onSeek}
        />
      </div>
    </div>
  );
};

export default memo(Volume);
