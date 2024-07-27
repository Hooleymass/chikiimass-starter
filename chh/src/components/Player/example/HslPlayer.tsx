'use client'
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const CustomHLSPlayer = ({ src, subtitles, poster }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;

    // Remove all existing tracks
    while (video.textTracks.length) {
      video.removeChild(video.textTracks[0]);
    }

    // Add subtitles
    subtitles.forEach((subtitle) => {
      const track = document.createElement('track');
      track.kind = 'subtitles';
      track.label = subtitle.language;
      track.srclang = subtitle.lang;
      track.src = subtitle.url;
      video.appendChild(track);
    });
  }, [subtitles]);

  return (
    <video
      ref={videoRef}
      controls
      poster={poster}
      style={{ width: '100%', height: 'auto' }}
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default CustomHLSPlayer;
