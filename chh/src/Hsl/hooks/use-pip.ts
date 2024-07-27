import { RefObject, useState, useLayoutEffect, useCallback } from "react";

const usePIP = (elRef: RefObject<HTMLVideoElement>) => {
  const [isPip, setIsPip] = useState<boolean>(false);

  const setPip = useCallback(async () => {
    if (!elRef.current) return;

    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
      setIsPip(false);
    } else {
      await elRef.current.requestPictureInPicture();
      setIsPip(true);
    }
  }, [elRef]);

  useLayoutEffect(() => {
    const handleEnterPip = () => setIsPip(true);
    const handleLeavePip = () => setIsPip(false);

    elRef.current?.addEventListener('enterpictureinpicture', handleEnterPip);
    elRef.current?.addEventListener('leavepictureinpicture', handleLeavePip);

    return () => {
      elRef.current?.removeEventListener('enterpictureinpicture', handleEnterPip);
      elRef.current?.removeEventListener('leavepictureinpicture', handleLeavePip);
    };
  }, [elRef]);

  return [isPip, setPip] as const;
};

export default usePIP;
