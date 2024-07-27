import React, { FC, useEffect, useRef, useState } from "react";

import Check from "./Icons/Check";
import ChevronLeft from "./Icons/ChevronLeft";
import ChevronRight from "./Icons/ChevronRight";
import Quality from "./Icons/Quality";
import SelectSubtitle from "./Icons/SelectSubtitle";
import { SettingsProps } from "../shared/types";
import Speed from "./Icons/Speed";

const SettingsDialog: FC<SettingsProps> = ({
  settingsActive,
  src,
  subtitles,
  playbackSpeed,
  setPlaybackSpeed,
  subtitleIndex,
  setSubtitleIndex,
  quality,
  setQuality,
  internationalization,
}) => {
  const [height, setHeight] = useState(0);

  const [activeSection, setActiveSection] = useState("main");

  const mainSectionRef = useRef<HTMLDivElement>(null);
  const speedSectionRef = useRef<HTMLDivElement>(null);
  const subtitlesSectionRef = useRef<HTMLDivElement>(null);
  const qualitySectionRef = useRef<HTMLDivElement>(null);

  const sections: { [key: string]: any } = {
    main: mainSectionRef,
    speed: speedSectionRef,
    subtitles: subtitlesSectionRef,
    quality: qualitySectionRef,
  };

  useEffect(() => {
    if (sections[activeSection].current) {
      const elementHeight = sections[activeSection].current.offsetHeight;
      setHeight(elementHeight > 250 ? 250 : elementHeight);
      sections[activeSection].current.scrollTo &&
        sections[activeSection].current.scrollTo(0, 0);
    }

    // eslint-disable-next-line
  }, [activeSection]);

  return (
    <div
      className={`chikiimass-settings-dialog ${settingsActive ? "chikiimass-show" : ""}`}
    >
      <div style={{ height }} className="chikiimass-settings-outer">
        <div
          ref={mainSectionRef}
          className={`chikiimass-settings-section chikiimass-settings-py ${
            activeSection === "main"
              ? "chikiimass-settings-translate-center"
              : "chikiimass-settings-translate-left"
          }`}
        >
          <div
            onClick={() => setActiveSection("speed")}
            className="chikiimass-settings-item"
          >
            <div className="chikiimass-settings-item-left">
              <Speed className="chikiimass-icon-sm" />
              <p>
                {internationalization?.settingsPlaybackSpeed ||
                  "Playback Speed"}
              </p>
            </div>
            <ChevronRight className="chikiimass-chevron" />
          </div>
          {subtitles && (
            <div
              onClick={() => setActiveSection("subtitles")}
              className="chikiimass-settings-item"
            >
              <div className="chikiimass-settings-item-left">
                <SelectSubtitle className="chikiimass-icon-sm" />
                <p>{internationalization?.settingsSubtitles || "Subtitles"}</p>
              </div>
              <ChevronRight style={{ width: 15, height: 15 }} />
            </div>
          )}
          {typeof src !== "string" && (
            <div
              onClick={() => setActiveSection("quality")}
              className="chikiimass-settings-item"
            >
              <div className="chikiimass-settings-item-left">
                <Quality className="chikiimass-icon-sm" />
                <p>{internationalization?.settingsQuality || "Quality"}</p>
              </div>
              <ChevronRight className="chikiimass-chevron" />
            </div>
          )}
        </div>

        <div
          ref={speedSectionRef}
          className={`chikiimass-settings-section ${
            activeSection === "speed"
              ? "chikiimass-settings-translate-center"
              : "chikiimass-settings-translate-right"
          }`}
        >
          <div
            onClick={() => setActiveSection("main")}
            className="chikiimass-settings-section-header"
          >
            <ChevronLeft className="chikiimass-chevron" />
            <span>
              {internationalization?.settingsPlaybackSpeed || "Playback speed"}
            </span>
          </div>
          <div className="chikiimass-settings-py">
            {new Array(8)
              .fill("")
              .map((_, index) =>
                index === 3
                  ? internationalization?.settingsPlaybackSpeedNormal ||
                    "Normal"
                  : (index + 1) / 4
              )
              .map((item, index) => (
                <div
                  key={item}
                  onClick={() => {
                    setPlaybackSpeed((index + 1) / 4);
                    setActiveSection("main");
                  }}
                  className="chikiimass-settings-item-2"
                >
                  {playbackSpeed === (index + 1) / 4 ? (
                    <Check className="chikiimass-chevron" />
                  ) : (
                    <div style={{ width: 15, height: 15 }}></div>
                  )}
                  <span>{item}</span>
                </div>
              ))}
          </div>
        </div>

        {subtitles && (
          <div
            ref={subtitlesSectionRef}
            className={`chikiimass-settings-section ${
              activeSection === "subtitles"
                ? "chikiimass-settings-translate-center"
                : "chikiimass-settings-translate-right"
            }`}
          >
            <div
              onClick={() => setActiveSection("main")}
              className="chikiimass-settings-section-header"
            >
              <ChevronLeft className="chikiimass-chevron" />
              <span>
                {internationalization?.settingsSubtitles || "Subtitles"}
              </span>
            </div>
            <div className="chikiimass-settings-py">
              <div
                onClick={() => {
                  setSubtitleIndex(-1);
                  setActiveSection("main");
                }}
                className="chikiimass-settings-item-2"
              >
                {subtitleIndex === -1 ? (
                  <Check className="chikiimass-chevron" />
                ) : (
                  <div style={{ width: 15, height: 15 }}></div>
                )}
                <span>
                  {internationalization?.settingsSubtitlesOff || "Off"}
                </span>
              </div>
              {subtitles.map((subtitle, index) => (
                <div
                  key={subtitle.lang}
                  onClick={() => {
                    setSubtitleIndex(index);
                    setActiveSection("main");
                  }}
                  className="chikiimass-settings-item-2"
                >
                  {subtitleIndex === index ? (
                    <Check className="chikiimass-chevron" />
                  ) : (
                    <div style={{ width: 15, height: 15 }}></div>
                  )}
                  <span>{subtitle.language}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {typeof src !== "string" && (
          <div
            ref={qualitySectionRef}
            className={`chikiimass-settings-section ${
              activeSection === "quality"
                ? "chikiimass-settings-translate-center"
                : "chikiimass-settings-translate-right"
            }`}
          >
            <div
              onClick={() => setActiveSection("main")}
              className="chikiimass-settings-section-header"
            >
              <ChevronLeft className="chikiimass-chevron" />
              <span>{internationalization?.settingsQuality || "Quality"}</span>
            </div>
            <div className="chikiimass-settings-py">
              {src.map((source, index) => (
                <div
                  key={source.quality}
                  onClick={() => {
                    setQuality(index);
                    setActiveSection("main");
                  }}
                  className="chikiimass-settings-item-2"
                >
                  {quality === index ? (
                    <Check className="chikiimass-chevron" />
                  ) : (
                    <div style={{ width: 15, height: 15 }}></div>
                  )}
                  <span>
                    {typeof source.quality === "number"
                      ? `${source.quality}p`
                      : source.quality}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SettingsDialog;
