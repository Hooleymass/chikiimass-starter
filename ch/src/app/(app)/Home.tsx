'use client'

import React, { useContext, useEffect } from 'react';
import ChannelCard from '@/app/components/UI/ChannelCard';
import Link from 'next/link';
import AutoCarousel from './Carousel';
import formatTime from '@/app/lib/formatTime';
import { WatchedVideosContext } from './context/WatchedVideosContext';
import Head from 'next/head';
import { Metadata } from 'next';

interface HomeProps {
  series: {
    docs: {
      id: number;
      name: string;
      seasons: {
        id: string;
        seasonNumber: string;
        episodes: {
          episodeNumber: string;
          episodeTitle: string;
          poster: {
            alt: string;
            url: string;
            createdAt: string;
          };
        }[];
      }[];
    }[];
  };
}

export const metadata: Metadata = {
  title: {
    absolute: 'Home - Chikiimass'
  }
}


const Home: React.FC<HomeProps> = ({ series }) => {
  const { watchedVideos, addWatchedVideo } = useContext(WatchedVideosContext);
  let url = typeof window !== 'undefined' ? window.location.href : '';
  url = url.replace(/\/$/, '');
  let domain = url.replace(/^(https?:\/\/)?/, '');
  domain = domain.replace(/\/$/, '');

  // Flatten episodes and sort by createdAt and episodeNumber
  const allEpisodes = series.docs.flatMap((series) =>
    series.seasons.flatMap((season) =>
      season.episodes.map((episode) => ({
        seriesName: series.name,
        seasonNumber: season.seasonNumber,
        ...episode,
      }))
    )
  );

  const sortedEpisodes = allEpisodes.sort((a, b) => {
    const timeDiff = new Date(b.poster.createdAt).getTime() - new Date(a.poster.createdAt).getTime();
    if (timeDiff === 0) {
      return parseInt(b.episodeNumber, 10) - parseInt(a.episodeNumber, 10);
    }
    return timeDiff;
  });

  return (
    <div className="mx-auto">
      <AutoCarousel
        image1={series.docs[0]?.seasons[0]?.episodes[0]?.poster.url}
        image2={series.docs[0]?.seasons[0]?.episodes[0]?.poster.url}
        image3={series.docs[0]?.seasons[0]?.episodes[0]?.poster.url}
        image4={series.docs[0]?.seasons[0]?.episodes[0]?.poster.url}
      />
      {['Keep Watching', 'Latest', 'Trending', 'Popular'].map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 pl-2">{category}</h2>
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
            {category === 'Keep Watching' ? (
              watchedVideos.length > 0 ? (
                <>
                  {/* Ad Holder as the first card */}
                  <div key="ad" className="ad-holder">
                    <div className="w-full h-full border-gray-300 flex items-center justify-center">
                      <span>Ad Placeholder</span>
                    </div>
                  </div>
                  {watchedVideos.map((episode, index) => (
                    <Link
                      href={`/videos/${episode.seriesName}/season/${episode.seasonNumber}/episode/${episode.episodeNumber}`}
                      key={index}
                    >
                      <ChannelCard
                        thumbnail={episode.poster.url || ''}
                        alt={episode.poster.alt || 'alt text'}
                        title={episode.episodeTitle}
                        name={episode.seriesName}
                        views={episode.episodeNumber}
                        published={formatTime(episode.poster.createdAt)}
                      />
                    </Link>
                  ))}
                </>
              ) : (
                <p>No watched videos yet.</p>
              )
            ) : (
              sortedEpisodes.map((episode, index) => (
                <Link
                  href={`/videos/${episode.seriesName}/season/${episode.seasonNumber}/episode/${episode.episodeNumber}`}
                  key={index}
                  onClick={() =>
                    addWatchedVideo({
                      seriesName: episode.seriesName,
                      seasonNumber: episode.seasonNumber,
                      episodeNumber: episode.episodeNumber,
                      episodeTitle: episode.episodeTitle,
                      poster: episode.poster,
                      createdAt: episode.poster.createdAt,
                    })
                  }
                >
                  <ChannelCard
                    thumbnail={episode.poster.url || ''}
                    alt={episode.poster.alt || 'alt text'}
                    title={episode.episodeTitle}
                    name={episode.seriesName}
                    views={episode.episodeNumber}
                    published={formatTime(episode.poster.createdAt)}
                  />
                </Link>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
