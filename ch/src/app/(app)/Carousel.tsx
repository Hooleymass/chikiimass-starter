'use client'
import { useEffect, useRef } from 'react';

const AutoCarousel = () => {
  const carouselRef = useRef(null);
  const items = [
    "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg",
    "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg",
    "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg",
    "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
  ];

  useEffect(() => {
    const carousel = carouselRef.current;
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % items.length;
      carousel.scrollTo({
        left: index * carousel.clientWidth,
        behavior: 'smooth',
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={carouselRef} className="carousel w-full overflow-x-auto flex snap-x">
      {items.map((src, idx) => (
        <div key={idx} className="carousel-item w-full flex-shrink-0 snap-center">
          <img src={src} className="w-[100%] xs:aspect-video" alt={`Slide ${idx + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default AutoCarousel;
