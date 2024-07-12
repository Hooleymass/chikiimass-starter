import { memo } from 'react';

import Btn from '../Btn';
import TrackSkipIcon  from '../../../icons/track-skip.svg';
import { FastForward } from 'lucide-react';

interface SkipProps {
  onSkip: () => void;
}

const Skip: React.FC<SkipProps> = ({ onSkip }) => {
  return (
    <Btn label="+ 10 seconds" onClick={onSkip}>
      <FastForward />
    </Btn>
  );
};

export default memo(Skip);
