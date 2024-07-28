import React from 'react';
import Image from 'next/image';

interface ThumbnailProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ src, alt, width, height }) => {
  console.log('image link',src)
  return (
    <div>
      <Image src={src} alt={alt} width={width} height={height} priority className='bg-gray-500 rounded-lg thumbnail'/>
    </div>
  );
};

export default Thumbnail;
