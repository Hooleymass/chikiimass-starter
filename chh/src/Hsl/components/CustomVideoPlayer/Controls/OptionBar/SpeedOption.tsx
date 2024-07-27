import React from "react";
import styled from "styled-components";
import { rem } from "@/Hsl/utils";

const SpeedOptions = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const SpeedOptionItem = styled.li<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: helvetica;
  font-size: ${rem("16px")};
  padding: ${rem("8px")} ${rem("16px")};
  user-select: none;
  width: 100%; /* Ensure items occupy 100% width */
  background-color: ${props => (props.selected ? "#404040" : "transparent")};
  color: ${props => (props.selected ? "#fff" : "inherit")};
  &:hover {
    cursor: pointer;
    background-color: rgba(50, 50, 50, 0.9); /* Slightly darker on hover */
  }
`;

const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const SpeedOption = ({ onSpeedChange, currentSpeed }: { onSpeedChange: (speed: number) => void, currentSpeed: number }) => {
  return (
    <SpeedOptions>
      {speedOptions.map((speed) => (
        <SpeedOptionItem key={speed} onClick={() => onSpeedChange(speed)} selected={speed === currentSpeed}>
          <span>{speed}x</span>
        </SpeedOptionItem>
      ))}
    </SpeedOptions>
  );
};

export default SpeedOption;
