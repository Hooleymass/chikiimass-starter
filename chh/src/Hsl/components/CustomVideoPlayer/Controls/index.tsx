import styled from "styled-components";
import ControlBar from "./ControlBar";
import OptionBar from "./OptionBar";
import VideoProgressSlider from "./VideoProgressSlider";
import { Flex } from "../../ui"

const ControlsContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  height: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(to top, #000, transparent);
  transition: all 0.25s cubic-bezier(0.4, 0, 1, 1);
  transition: height 0.1s cubic-bezier(0.4, 0, 1, 1);

  svg,
  input[type="range"] {
    opacity: 0.9;
    cursor: pointer;
  }

  &:hover > #player-controls-wrapper {
    visibility: visible;
    opacity: 0.9;
    height: 65px;
  }
`;

const ControlsWrapper = styled(Flex)`
  justify-content: space-between;
  visibility: hidden;
  opacity: 0;
  height: 0;
  transition: visibility 0.25s, opacity 0.25s, height 0.1s;

  svg:hover {
    transform: scale(1.1);
    opacity: 1;
  }

  & div {
    display: flex;
    align-items: center;
  }
`;

const Controls = () => {
  return (
    <ControlsContainer id="player-controls">
      <VideoProgressSlider />
      <ControlsWrapper id="player-controls-wrapper">
        <ControlBar />
        <OptionBar />
      </ControlsWrapper>
    </ControlsContainer>
  );
};

export default Controls;
