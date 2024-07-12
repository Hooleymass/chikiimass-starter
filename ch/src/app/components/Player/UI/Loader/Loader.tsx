import { memo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import './Loader.css';

interface LoaderProps {
  on: boolean;
  style?: React.CSSProperties;
}

const Loader: React.FC<LoaderProps> = ({ on, style }) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={on}
      classNames="vp-loader"
      timeout={300}
      mountOnEnter
      unmountOnExit
      nodeRef={loaderRef}
    >
      <div className="vp-loader" style={style} ref={loaderRef}>
        <div />
      </div>
    </CSSTransition>
  );
};

export default memo(Loader);
