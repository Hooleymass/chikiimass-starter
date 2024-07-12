import Btn from '../Btn';
import PipInIcon  from '../../../icons/pip-in.svg';
import PipOutIcon  from '../../../icons/pip-out.svg';
import { PictureInPicture, PictureInPicture2 } from 'lucide-react';

interface PipProps {
  isPipMode: boolean;
  onToggle: () => void;
}

const Pip: React.FC<PipProps> = ({ isPipMode, onToggle }) => {
  return (
    <Btn label="Picture in Picture" onClick={onToggle}>
      {isPipMode ? <PictureInPicture2 /> : <PictureInPicture />}
    </Btn>
  );
};

export default Pip;
