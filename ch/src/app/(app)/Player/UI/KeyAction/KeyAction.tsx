import { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

//import VolumeHighIcon  from '../../icons/volume-high.svg';
//import VolumeMiddleIcon  from '../../icons/volume-middle.svg';
//import VolumeLowIcon  from '../../icons/volume-low.svg';
//import VolumeMuteIcon  from '../../icons/volume-mute.svg';
//import TrackRewindIcon  from '../../icons/track-rewind.svg';
//import TrackSkipIcon  from '../../icons/track-skip.svg';
import './KeyAction.css';
import { Volume1 as VolumeMiddleIcon, Volume2 as VolumeHighIcon, VolumeIcon as VolumeLowIcon , VolumeX as VolumeMuteIcon  } from 'lucide-react';
import { FastForward as TrackRewindIcon, RewindIcon as TrackSkipIcon } from 'lucide-react';


export interface KeyActionHandle {
  rewind: HTMLDivElement;
  skip: HTMLDivElement;
}

interface KeyActionProps {
  on: boolean;
  volume: number;
}

const KeyAction = forwardRef<KeyActionHandle, KeyActionProps>(
  ({ on, volume }, ref) => {
    const rewindRef = useRef<HTMLDivElement>(null);
    const skipRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      get rewind() {
        return rewindRef.current!;
      },
      get skip() {
        return skipRef.current!;
      },
    }));

    return (
      <div className="vp-key-action">
        <CSSTransition
          in={on}
          classNames="vp-key-volume"
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <div className="vp-key-action__volume">
            <div className="vp-key-action__volume__container">
              <div className="vp-key-action__volume__icon">
                {volume > 0.7 && <VolumeHighIcon />}
                {volume <= 0.7 && volume > 0.3 && <VolumeMiddleIcon />}
                {volume <= 0.3 && volume > 0 && <VolumeLowIcon />}
                {volume === 0 && <VolumeMuteIcon />}
              </div>
              <div className="vp-key-action__volume__range">
                <div className="vp-key-action__volume__range--background" />
                <div
                  className="vp-key-action__volume__range--current"
                  style={{ width: `${volume * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CSSTransition>

        <div className="vp-key-action__progress rewind" ref={rewindRef}>
          <div className="vp-key-action__progress__container">
            <TrackRewindIcon />
            <span>- 10 seconds</span>
          </div>
        </div>
        <div className="vp-key-action__progress skip" ref={skipRef}>
          <div className="vp-key-action__progress__container">
            <TrackSkipIcon />
            <span>+ 10 seconds</span>
          </div>
        </div>
      </div>
    );
  }
);

export default memo(KeyAction);
