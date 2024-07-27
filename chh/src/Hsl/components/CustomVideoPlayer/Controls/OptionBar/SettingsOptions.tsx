import { useState, useEffect, useRef } from "react";
import { Icon } from "@/Hsl/components/ui";
import SpeedOption from "./SpeedOption";
import QualitySelectOption from "./QualitySelectOption";
import useVideoPlayerStore from "@/Hsl/store/video-player-store";
import styled from "styled-components";
import { rem } from "@/Hsl/utils";
import usePlaybackSpeed from "@/Hsl/hooks/use-PlaybackSpeed";

const SettingsOptions = styled.div`
  position: absolute;
  bottom: 70px;
  right: ${rem("8px")};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 300px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.9); /* Transparent dark background */
  max-height: 200px;
  overflow-y: auto;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transform: ${(props) => (props.isOpen ? 'scale(1)' : 'scale(0.95)')};
`;

const SettingsOption = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: helvetica;
  font-size: ${rem("16px")};
  padding: ${rem("8px")} ${rem("16px")};
  user-select: none;
  width: 100%; /* Ensure items occupy 100% width */
  &:hover {
    cursor: pointer;
    background-color: rgba(50, 50, 50, 0.9); /* Slightly darker on hover */
  }
`;

const SettingsHeader = styled.div`
  display: flex;
  align-items: center;
  font-family: helvetica;
  font-size: ${rem("16px")};
  padding: ${rem("8px")} ${rem("16px")};
  user-select: none;
  border-bottom: 1px solid #ccc;
  background-color: rgba(0, 0, 0, 0.9);
  color: #fff;
  svg {
    margin-right: 8px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submenu, setSubmenu] = useState<null | "speed" | "quality">(null);
  const { playerRef, playerContainerRef } = useVideoPlayerStore();
  const [speed, setSpeed] = usePlaybackSpeed(playerRef);
  const settingsRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setSubmenu(null); // Reset submenu when toggling dropdown
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    setSubmenu(null);
  };

  const handleBack = () => setSubmenu(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      settingsRef.current &&
      !settingsRef.current.contains(event.target as Node) &&
      !playerContainerRef.current?.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleMouseLeave = (event: MouseEvent) => {
    if (
      playerContainerRef.current &&
      !playerContainerRef.current.contains(event.relatedTarget as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      playerContainerRef.current?.addEventListener("mouseleave", handleMouseLeave);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      playerContainerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      playerContainerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={settingsRef}>
      <Icon title="Settings" name="gear" size="30px" onClick={toggleDropdown} />
      {isOpen && (
        <SettingsOptions
          className="absolute right-0 bottom-full mb-2 w-48 bg-white border border-gray-300 rounded shadow-lg"
          isOpen={isOpen}
        >
          {submenu === null && (
            <>
              <SettingsOption onClick={() => setSubmenu("quality")}>
                <span>Quality</span>
                <Icon name="chevron-right" size="16px" />
              </SettingsOption>
              <SettingsOption onClick={() => setSubmenu("speed")}>
                <span>Speed</span>
                <span>{speed}x</span>
                <Icon name="chevron-right" size="16px" />
              </SettingsOption>
            </>
          )}
          {submenu === "speed" && (
            <>
              <SettingsHeader onClick={handleBack}>
                <Icon name="arrow-left" size="16px" />
                <span>Speed</span>
              </SettingsHeader>
              <SpeedOption onSpeedChange={handleSpeedChange} currentSpeed={speed} />
            </>
          )}
          {submenu === "quality" && (
            <>
              <SettingsHeader onClick={handleBack}>
                <Icon name="arrow-left" size="16px" />
                <span>Quality</span>
              </SettingsHeader>
              <QualitySelectOption />
            </>
          )}
        </SettingsOptions>
      )}
    </div>
  );
};

export default Settings;
