import { Icon } from "../../../../components/ui";
import usePIP from "../../../../hooks/use-pip";
import useVideoPlayerStore from "../../../../store/video-player-store";

const PIPOption = () => {
  const { playerRef } = useVideoPlayerStore();
  const [isPip, setPip] = usePIP(playerRef);

  return (
    <Icon
      title="PIP"
      name={isPip ? "pipin" : "pipout"}
      size="30px"
      onClick={setPip}
    />
  );
};

export default PIPOption;
