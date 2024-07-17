import React, { useContext } from 'react';
import ChannelCard from '@/app/components/UI/ChannelCard';
import Link from 'next/link';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import AutoCarousel from './Carousel';
import formatTime from '@/app/lib/formatTime';
import { WatchedVideosContext } from './context/WatchedVideosContext';

interface Homeprops {
  id: number;
  name: string;
  views: string;
  published: any;
  poster: {
    url: string;
  };
}

const payload = await getPayloadHMR({ config: configPromise });
const series = await payload.find({
  collection: 'series',
  depth: 2,
});

const Home: React.FC<Homeprops> = () => {
  const { watchedVideos, addWatchedVideo } = useContext(WatchedVideosContext);

  return (
    <div className="mx-auto">
      <AutoCarousel
        image1={series.docs[0]?.poster.url}
        image2={series.docs[0]?.poster.url}
        image3={series.docs[0]?.poster.url}
        image4={series.docs[0]?.poster.url}
      />
      {['Keep Watching', 'Favorites', 'Trending', 'Popular'].map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 pl-2">{category}</h2>
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
            {category === 'Keep Watching' ? (
              watchedVideos.length > 0 ? (
                watchedVideos.map((episode, index) => (
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
                      published={formatTime(episode.createdAt)}
                    />
                  </Link>
                ))
              ) : (
                <p>No watched videos yet.</p>
              )
            ) : (
              series.docs.map((item) => {
                const { id: seriesId, name, seasons } = item as {
                  id: string;
                  name: string;
                  seasons: any;
                };
                return (
                  <div key={seriesId}>
                    {seasons.map((season: { id: string; seasonNumber: string; episodes: any }) => {
                      const { id: seasonId, seasonNumber, episodes } = season as {
                        id: string;
                        seasonNumber: string;
                        episodes: any;
                      };
                      return (
                        <div key={seasonId}>
                          <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
                            {episodes.map((episode: { episodeNumber: string; episodeTitle: string; poster: { url: string; alt: string } }, index: any) => {
                              const {
                                episodeNumber: episodeId,
                                episodeTitle,
                                poster,
                                createdAt: episodecreatedAt
                              } = episode as {
                                episodeNumber: string;
                                episodeTitle: string;
                                poster: { url: string; alt: string };
                                createdAt: string;
                              };
                              const dateStr: string = episodecreatedAt;
                              const format = formatTime(dateStr);
                              return (
                                <Link
                                  href={`/videos/${name}/season/${seasonNumber}/episode/${episodeId}`}
                                  key={index}
                                  onClick={() =>
                                    addWatchedVideo({
                                      seriesName: name,
                                      seasonNumber,
                                      episodeNumber: episodeId,
                                      episodeTitle,
                                      poster,
                                      createdAt: dateStr,
                                    })
                                  }
                                >
                                  <ChannelCard
                                    thumbnail={poster?.url || ''}
                                    alt={poster?.alt || 'alt text'}
                                    title={episodeTitle}
                                    name={name}
                                    views={episodeId}
                                    published={format}
                                  />
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
