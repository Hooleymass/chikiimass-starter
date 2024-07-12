'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ChannelCard from '@/app/components/UI/ChannelCard';
import Player from '@/app/components/Player';

interface Video {
  id: number;
  title: string;
  views: string;
  published: string;
  thumbnail: string;
  videoSrc: string;
}

const videos: Video[] = [
  {
    id: 1,
    title: "Zari",
    views: "135000",
    published: "9 months ago",
    thumbnail: 'https://placehold.co/600x400',
    videoSrc: 'http://localhost:8000/cece%2015a38634f803584ba8926411d7bee906856cab0654b5b6.mp4',
  },
  {
    id: 2,
    title: "Becky",
    views: "135000",
    published: "9 months ago",
    thumbnail: 'https://placehold.co/600x400',
    videoSrc: 'http://localhost:8000/cece%2015a38634f803584ba8926411d7bee906856cab0654b5b6.mp4',
  },
  {
    id: 3,
    title: "Jua Kali",
    views: "135000",
    published: "9 months ago",
    thumbnail: 'https://placehold.co/600x400',
    videoSrc: 'http://localhost:8000/cece%2015a38634f803584ba8926411d7bee906856cab0654b5b6.mp4',
  },
  {
    id: 4,
    title: "Salema",
    views: "135000",
    published: "9 months ago",
    thumbnail: 'https://placehold.co/600x400',
    videoSrc: 'http://localhost:8000/cece%2015a38634f803584ba8926411d7bee906856cab0654b5b6.mp4',
  },
  {
    id: 5,
    title: "Huba",
    views: "135000",
    published: "9 months ago",
    thumbnail: 'https://placehold.co/600x400',
    videoSrc: 'http://localhost:8000/cece%2015a38634f803584ba8926411d7bee906856cab0654b5b6.mp4',
  },
  {
    id: 6,
    title: "Kasiri",
    views: "135000",
    published: "9 months ago",
    thumbnail: 'https://placehold.co/600x400',
    videoSrc: 'http://localhost:8000/cece%2015a38634f803584ba8926411d7bee906856cab0654b5b6.mp4',
  },
  {
    id: 7,
    title: "WWE",
    views: "135000",
    published: "9 months ago",
    thumbnail: 'https://placehold.co/600x400',
    videoSrc: 'http://localhost:8000/cece%2015a38634f803584ba8926411d7bee906856cab0654b5b6.mp4',
  },
  {
    id: 8,
    title: "Njoro Wa Uba",
    views: "135000",
    published: "9 months ago",
    thumbnail: 'https://placehold.co/600x400',
    videoSrc: 'http://localhost:8000/cece%2015a38634f803584ba8926411d7bee906856cab0654b5b6.mp4',
  },
  {
    id: 9,
    title: "Perdona Nuestros Pecados",
    views: "135000",
    published: "9 months ago",
    thumbnail: 'https://placehold.co/600x400',
    videoSrc: 'http://localhost:8000/cece%2015a38634f803584ba8926411d7bee906856cab0654b5b6.mp4',
  },
  {
    id: 10,
    title: "Jua Kali",
    views: "135000",
    published: "9 months ago",
    thumbnail: 'https://placehold.co/600x400',
    videoSrc: 'http://localhost:8000/cece%2015a38634f803584ba8926411d7bee906856cab0654b5b6.mp4',
  },
  {
    id: 11,
    title: "Njoro Wa Uba",
    views: "135000",
    published: "9 months ago",
    thumbnail: 'https://placehold.co/600x400',
    videoSrc: 'http://localhost:8000/cece%2015a38634f803584ba8926411d7bee906856cab0654b5b6.mp4',
  }
];

const VideoScreen: React.FC = () => {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const video = videos.find(v => v.id.toString() === id);
  const relatedVideos = videos.filter(v => v.id.toString() !== id);

  return (
    <div className="container mx-auto px-4">
      {video ? (
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-grow">
            <div className="sticky top-0 z-50 bg-black">
              <Player src={video.videoSrc} thumbnail={video.thumbnail} autoPlay={true}/>
            </div>
            <div className="mt-4 text-white">
              <h1 className="text-3xl font-bold">{video.title}</h1>
              <div className="flex items-center mt-2">
                <span>{video.views} views</span>
                <span className="mx-2">•</span>
                <span>{video.published}</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 overflow-auto max-h-screen">
            <h2 className="text-2xl font-bold mb-4">Related Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {relatedVideos.map((relatedVideo) => (
                <Link href={`/v/${relatedVideo.id}`} key={relatedVideo.id}>
                  <ChannelCard
                    title={relatedVideo.title}
                    alt={relatedVideo.title}
                    thumbnail={relatedVideo.thumbnail}
                    name={relatedVideo.title}
                    views={relatedVideo.views}
                    published={relatedVideo.published}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white">Video not found</div>
      )}
    </div>
  );
};

export default VideoScreen;
