'use client'
import { useEffect, useState } from 'react';

const ThumbnailComponent = () => {
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    const fetchThumbnail = async () => {
      const response = await fetch('/thumbnail');
      const data = await response.json();
      console.log(data)
      setThumbnail(data.thumbnail.replace(process.cwd() + '/', ''));
    };
    fetchThumbnail();
  }, []);

  return <img src={`/${thumbnail}`} alt="Video Thumbnail" />;
};

export default ThumbnailComponent;
