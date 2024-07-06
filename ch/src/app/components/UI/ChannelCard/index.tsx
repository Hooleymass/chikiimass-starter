import React from 'react';

interface ChannelCardProps {
  video: {
    id: string;
    name: string;
    poster: {
      url: string;
      alt: string;
    }
  };
}

export const ChannelCard: React.FC<ChannelCardProps> = ({ video }) => {
  return (
    <div key={video.id} className="max-w-[422px]">
      <img className='rounded-md' src={video.poster.url} alt={video.poster.alt} />
      <div>
        <h1>{video.name}</h1>
      </div>
    </div>
  );
};
