import React from 'react';

interface ThumbnailProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ src, alt, width, height }) => {
  return (
    <div>
      <img src={src} alt={alt} width={width} height={height} loading='eager' className='bg-gray-500 rounded-lg thumbnail'/>
    </div>
  );
};

export default Thumbnail;
