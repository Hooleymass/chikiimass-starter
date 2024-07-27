import React from 'react';
import ChannelCard from '@/app/components/UI/ChannelCard';
import Link from 'next/link';
import formatTime from '@/app/lib/formatTime';
import { Metadata } from 'next';
import { gettv } from './getTv';

/* const payload = await getPayloadHMR({ config: configPromise });
const tv = await payload.find({
  collection: 'series',
  draft: false,
}); */
const tv = await gettv();

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const metadata: Metadata = {
  title: {
    absolute: 'Tv - Chikiimass'
  },
  openGraph: {
    title: 'Tv - Chikiimass',
    description: "Enjoy the videos and music you love, and share it all with friends, family, and the world on ChikiiMass.",
    url: '',
    siteName: 'chikiimass',
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'chikiimass',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TV - Chikiimass',
    description: "Enjoy the videos and music you love, and share it all with friends, family, and the world on ChikiiMass.",
    siteId: '',
    creator: '@chikiimass',
    creatorId: '',
    images: ['https://nextjs.org/og.png'],
  },
}

const TV = () => {
  // Flatten and sort episodes
  const episodes = tv.docs.flatMap((series) => {
    return series.seasons.flatMap((season) => {
      return season.episodes.map((episode) => ({
        seriesName: series.name,
        seasonNumber: season.seasonNumber,
        ...episode,
      }));
    });
  }).sort((a, b) => new Date(a.poster.createdAt).getTime() - new Date(b.poster.createdAt).getTime());

  // Shuffle episodes to mix them randomly
  const shuffledEpisodes = shuffleArray(episodes);

  
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">TV Shows</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Ad Holder as the first card */}
        <div key="ad" className="ad-holder">
          <div className="w-full h-full border-gray-300 flex items-center justify-center">
            <span>Ads.</span>
          </div>
        </div>
        {shuffledEpisodes.map((item, index) => {
          const {
            seriesName,
            seasonNumber,
            episodeNumber,
            episodeTitle,
            poster,
          } = item;

          const format = formatTime(poster.createdAt);

          return (
            <Link href={`/videos/${seriesName}/season/${seasonNumber}/episode/${episodeNumber}`} key={index}>
              <ChannelCard
                thumbnail={poster?.url || ''}
                alt={poster?.alt || 'alt text'}
                title={episodeTitle}
                name={seriesName}
                views={episodeNumber}
                published={format}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TV;
