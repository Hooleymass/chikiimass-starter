import { useState, memo, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';

interface DropdownProps {
  on: boolean;
  playbackRates: number[];
  activePlaybackRate: number;
  onClose: (on: boolean) => void;
  onChangePlaybackRate: (playbackRate: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  on,
  playbackRates,
  activePlaybackRate,
  onClose,
  onChangePlaybackRate,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isIndex, setIsIndex] = useState(true);
  const [activeType, setActiveType] = useState<'speed' | 'resolution'>('speed');
  const [dropdownHeight, setDropdownHeight] = useState<'initial' | number>(
    'initial'
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMounted) return;

    const outsideClickHandler = (event: MouseEvent) => {
      if (!isMounted || !dropdownRef || !dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        onClose(false);
      }
    };

    document.addEventListener('click', outsideClickHandler);

    return () => {
      document.removeEventListener('click', outsideClickHandler);
    };
  }, [isMounted, onClose]);

  useEffect(() => {
    if (!on) return;

    const dropdown = dropdownRef.current!;
    const dropdownMenu = dropdown.firstChild as HTMLElement;

    setDropdownHeight(dropdownMenu?.offsetHeight || 'initial');
  }, [on]);

  const dropdownEnteredHandler = useCallback(() => {
    setIsMounted(true);
  }, []);

  const dropdownExitedHandler = useCallback(() => {
    setIsMounted(false);
    setIsIndex(true);
    setDropdownHeight('initial');
  }, []);

  const calcHeight = useCallback((element: HTMLElement) => {
    setDropdownHeight(element.offsetHeight);
  }, []);

  const selectMenuHandler = useCallback((type: 'speed' | 'resolution') => {
    return () => {
      setIsIndex(false);
      setActiveType(type);
    };
  }, []);

  const selectPlaybackRateHandler = useCallback(
    (playbackRate: number) => {
      return () => {
        setIsIndex(true);
        onChangePlaybackRate(playbackRate);
      };
    },
    [onChangePlaybackRate]
  );

  const indexMenu = (
    <motion.div
      className="vp-dropdown__menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ul className="vp-dropdown__list">
        <li
          className="vp-dropdown__item"
          onClick={selectMenuHandler('speed')}
        >
          <span>Speed</span>
          <span>x {activePlaybackRate}</span>
        </li>
        {/* <li
          className="vp-dropdown__item"
          onClick={selectMenuHandler('resolution')}
        >
          <span>Resolution</span>
          <span>1080p</span>
        </li> */}
      </ul>
    </motion.div>
  );

  const mainMenu = (
    <motion.div
      className="vp-dropdown__menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ul className="vp-dropdown__list">
        {activeType === 'speed' &&
          playbackRates.map((playbackRate) => (
            <li
              key={playbackRate}
              className={`vp-dropdown__item ${
                playbackRate === activePlaybackRate ? 'active' : ''
              }`}
              onClick={selectPlaybackRateHandler(playbackRate)}
            >
              <span>x {playbackRate}</span>
            </li>
          ))}
        {/* {activeType === 'resolution' &&
          resolutions.map((resolution) => (
            <li
              key={resolution}
              className={`vp-dropdown__item ${
                resolution === activeResolution ? 'active' : ''
              }`}
              onClick={selectResolutionHandler(resolution)}
            >
              <span>{resolution}</span>
            </li>
          ))} */}
      </ul>
    </motion.div>
  );

  return (
    <motion.div
      className={`vp-dropdown ${on ? 'active' : ''}`}
      initial={{ height: 0 }}
      animate={{ height: dropdownHeight, translateY: 0 }}
      exit={{ height: 0, translateY: 0 }}
      ref={dropdownRef}
    >
      {isIndex ? indexMenu : mainMenu}
    </motion.div>
  );
};

export default memo(Dropdown);
