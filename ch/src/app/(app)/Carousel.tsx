'use client'
import { useEffect, useRef } from 'react';

interface AutoCarouselProps {
  image1: string
  image2: string
  image3: string
  image4: string
}

const AutoCarousel: React.FC<AutoCarouselProps> = ({image1, image2, image3, image4}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const items = [
    image1,
    image2,
    image3,
    image4
  ];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    let index = 0;
    const itemCount = items.length;

    const interval = setInterval(() => {
      index = (index + 1) % itemCount;

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
        }, 500); // Adjust this timeout to match the scroll behavior
      }
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={carouselRef} className="carousel w-full overflow-x-auto flex snap-x">
      {items.concat(items[0]).map((src, idx) => (
        <div key={idx} className="carousel-item w-full flex-shrink-0 snap-center">
          <img src={src} className="w-[100%] xs:aspect-video" alt={`Slide ${idx + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default AutoCarousel;
