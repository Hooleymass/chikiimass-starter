import { memo } from 'react';
 
import Btn from '../Btn';
import TrackRewindIcon  from '../../../icons/track-rewind.svg';
import { RewindIcon } from 'lucide-react';

interface RewindProps {
  onRewind: () => void;
}

const Rewind: React.FC<RewindProps> = ({ onRewind }) => {
  return (
    <Btn label="- 10 seconds" onClick={onRewind}>
      <RewindIcon />
    </Btn>
  );
};

export default memo(Rewind);
