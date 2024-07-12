import { memo } from 'react';

import Btn from '../Btn';
import FullscreenIcon  from '../../../icons/fullscreen.svg';
import FullscreenExitIcon  from '../../../icons/fullscreen-exit.svg';
import { LucideFullscreen, Minimize } from 'lucide-react';

interface FullscreenProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

const Fullscreen: React.FC<FullscreenProps> = ({ isFullscreen, onToggle }) => (
  <Btn
    label={isFullscreen ? 'Fullscreen Off' : 'Fullscreen'}
    onClick={onToggle}
  >
    {!isFullscreen && <LucideFullscreen />}
    {isFullscreen && <Minimize />}
  </Btn>
);

export default memo(Fullscreen);
