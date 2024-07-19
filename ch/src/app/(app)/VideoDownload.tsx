'use client'
import React, { useRef, useState } from 'react'

const VideoDownload: React.FC = () => {
    const [videoUrl] = useState("http://localhost:8003/EP.10.v1.1717697110.480p.mp4")
    const [videoSize, setVideoSize] = useState<number | null>(null);
    const [videoDuration, setVideoDuration] = useState<number | null>(null);
    const [showPopup, setshowPopup] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const fetchVideoMetadata = () => {
        if(videoRef.current) {
            videoRef.current.addEventListener('loadedmetadata', () => {
                setVideoDuration(videoRef.current?.duration ?? null);
                setVideoSize(videoRef.current?.videoWidth ?? null);
                setshowPopup(true);
            });
            videoRef.current.src = videoUrl;
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = videoUrl;
        link.download = "http://localhost:8003/EP.10.v1.1717697110.480p.mp4"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setshowPopup(false);
    }
  return (
    <div>
      <button onClick={fetchVideoMetadata}>Download video</button>

      <video ref={videoRef} style={{display: 'none'}}/>

      {showPopup && (
        <div className="popup">
            <div className="popup-container">
                <p>Video size: {videoSize ? (videoSize / ( 1024 * 1024 )).toFixed(2) + ' MB' : 'Unknown'}</p>
                <p>Video Duration: {videoDuration ? new Date(videoDuration * 1000).toISOString().substring(11, 8) : 'Uknown'}</p>
                <button onClick={handleDownload}>Proceed to Download</button>
                <button onClick={() => setshowPopup(false)}> cancel</button>
            </div>
        </div>
      )}
    </div>
  )
}

export default VideoDownload
