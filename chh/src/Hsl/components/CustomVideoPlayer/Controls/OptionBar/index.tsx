import styled from "styled-components";
import { rem } from "../../../../utils";
import ExpandOption from "./ExpandOption";
import QualitySelectOption from "./QualitySelectOption";
import PlaylistOption from "./PlaylistOption";
import Settings from "./SettingsOptions";
import PIPOption from "./PIP";
import SpeedOption from "./SpeedOption";

const OptionBarWrapper = styled.div`
  margin: ${rem("16px")} ${rem("24px")};
  svg {
    margin-left: ${rem("16px")};
  }
`;

const OptionBar = () => {
  return (
    <OptionBarWrapper>
      <PlaylistOption />
      <Settings />
      <PIPOption />
      <ExpandOption />
    </OptionBarWrapper>
  );
};

export default OptionBar;
