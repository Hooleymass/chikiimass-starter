import React from 'react';
import Thumbnail from './Thumbnail';
import Info from './Info';

interface Episode {
  episodeNumber: number;
  title: string;
  description: string;
  duration: string;
  airDate: string;
  rating: number;
}

interface Season {
  seasonNumber: number;
  releaseDate: string;
  episodes: Episode[];
}

interface Series {
  seriesTitle: string;
  description: string;
  genres: string[];
  seasons: Season[];
}

interface CardProps {
  src: string;
  alt: string;
  name: string;
  title: string;
  views: string;
  time: string
}

const Card: React.FC<CardProps> = ({ src = '/public/zari.jpg', alt = 'thumbnail', name = "Video Title here", title = "Video Custom Title", time = "22 hours ago", views = "22 M Views" }) => {
  return (
    <div>
      <div className='vid-list'>

        <Thumbnail
          src={src}
          alt={alt}
          width={422}
          height={222}
        />

      </div>

      <Info
        title={title}
        name={name}
        time={time}
        views={views}
      />
    </div>
  );
};

export default Card;
