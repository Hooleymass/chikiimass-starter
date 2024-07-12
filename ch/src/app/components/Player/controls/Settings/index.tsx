import { memo } from 'react';

import Btn from '../Btn';
import SettingIcon  from '../../../icons/gear.svg';
import { SettingsIcon } from 'lucide-react';

interface SettingsProps {
  onToggle: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onToggle }) => {
  return (
    <Btn label="Settings" onClick={onToggle}>
      <SettingsIcon />
    </Btn>
  );
};

export default memo(Settings);
