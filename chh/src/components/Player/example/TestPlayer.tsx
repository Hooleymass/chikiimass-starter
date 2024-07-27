import * as React from "react";

import { Player } from "../src";
import ReactHlsPlayer from "react-hls-player";

const TestPlayer = () => {
  return (
    <div>
      <Player 
      src="/test/index.m3u8"
      subtitles={[
        {
          lang: "en",
          language: "English",
          url:
            "/en.vtt",
        },
        {
          lang: "fr",
          language: "French",
          url:
            "/fr.vtt",
        },
      ]}
      primaryColor='purple'
      pictureInPicture={true}
      >
        {(ref, props) => <ReactHlsPlayer playerRef={ref} autoPlay {...props} />}
      </Player>
      {/*     <Player
      src={[
        {
          quality: "Full HD",
          url:
            "/video.mp4",
        },
        {
          quality: 720,
          url:
            "/video.mp4",
        },
        {
          quality: 480,
          url:
            "/video.mp4",
        },
      ]}
      subtitles={[
        {
          lang: "en",
          language: "English",
          url:
            "/en.vtt",
        },
        {
          lang: "fr",
          language: "French",
          url:
            "/fr.vtt",
        },
      ]}
      poster="/zari.jpg"
    /> */}
    </div>
  );
};

export default TestPlayer;
