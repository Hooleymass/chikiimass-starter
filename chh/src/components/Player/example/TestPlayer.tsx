import * as React from "react";
import { useState } from "react";
import { Player } from "../src";
import ReactHlsPlayer from "react-hls-player";

const TestPlayer = ({ videoSrc='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'}) => {
  //const videoSrc = "http://vjs.zencdn.net/v/oceans.mp4";

  const isHls = (url) => {
    return /\.m3u8($|\?)/.test(url);
  };

  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleClick = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div>
      {isHls(videoSrc) ? (
        <Player
          src={videoSrc}
          subtitles={[
            {
              lang: "en",
              language: "English",
              url: "/en.vtt",
            },
            {
              lang: "fr",
              language: "French",
              url: "/fr.vtt",
            },
          ]}
          primaryColor="oklch(var(--p))"
          pictureInPicture={true}
        >
          {(ref, props) => (
            <ReactHlsPlayer
              playerRef={ref}
              autoPlay
              {...props}
              onContextMenu={handleContextMenu}
            />
          )}
        </Player>
      ) : (
        <Player
          src={videoSrc}
          subtitles={[
            {
              lang: "en",
              language: "English",
              url: "/en.vtt",
            },
            {
              lang: "fr",
              language: "French",
              url: "/fr.vtt",
            },
          ]}
          primaryColor="purple"
          pictureInPicture={true}
        >
          {(ref, props) => (
            <video
              ref={ref}
              autoPlay
              {...props}
              onContextMenu={handleContextMenu}
            />
          )}
        </Player>
      )}
      {contextMenu.visible && (
        <div
          style={{
            position: "absolute",
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: "white",
            border: "1px solid black",
            zIndex: 1000,
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 10 }}>
            <li>Custom Option 1</li>
            <li>Custom Option 2</li>
            <li>Custom Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestPlayer;
