import Btn from './Btn';
//import { ReactComponent as PipInIcon } from 'icons/pip-in.svg';
//import { ReactComponent as PipOutIcon } from 'icons/pip-out.svg';
import { PictureInPicture as PipInIcon, PictureInPicture2 as PipOutIcon } from 'lucide-react';

interface PipProps {
  isPipMode: boolean;
  onToggle: () => void;
}

const Pip: React.FC<PipProps> = ({ isPipMode, onToggle }) => {
  return (
    <Btn label="Picture in Picture" onClick={onToggle}>
      {isPipMode ? <PipOutIcon /> : <PipInIcon />}
    </Btn>
  );
};

export default Pip;
