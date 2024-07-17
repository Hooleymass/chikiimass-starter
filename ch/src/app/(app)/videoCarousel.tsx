'use client'
import { useEffect, useRef } from 'react';

interface AutoCarouselProps {
  video1: string
  video2: string
  video3: string
  video4: string
}

const AutoCarousel: React.FC<AutoCarouselProps> = ({video1, video2, video3, video4}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const items = [
    video1,
    video2,
    video3,
    video4
  ];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    let index = 0;
    const itemCount = items.length;

    const interval = setInterval(() => {
      const videos = carousel.querySelectorAll('video');
      
      // Pause and reset all videos
      videos.forEach((video: HTMLVideoElement) => {
        video.pause();
        video.currentTime = 0;
      });

      // Play the next video
      index = (index + 1) % itemCount;
      const nextVideo = videos[index];
      if (nextVideo) {
        nextVideo.play();
      }

      // Move to the next slide
      carousel.scrollTo({
        left: index * carousel.clientWidth,
        behavior: 'smooth',
      });

      // If it's the last slide, reset to the start after the transition
      if (index === itemCount - 1) {
        setTimeout(() => {
          index = 0;
          carousel.scrollTo({
            left: 0,
            behavior: 'auto',
          });
          // Play the first video again
          const firstVideo = videos[0];
          if (firstVideo) {
            firstVideo.play();
          }
        }, 500); // Adjust this timeout to match the scroll behavior
      }
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={carouselRef} className="carousel w-full overflow-x-auto flex snap-x">
      {items.concat(items[0]).map((src, idx) => (
        <div key={idx} className="carousel-item w-full flex-shrink-0 snap-center">
          <video
            src={src}
            className="w-[100%] xs:aspect-video"
            muted
            loop
            playsInline
          />
        </div>
      ))}
    </div>
  );
};

export default AutoCarousel;
