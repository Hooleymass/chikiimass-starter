'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import formatTime from '@/app/lib/formatTime';
import ChannelCard from '@/app/components/UI/ChannelCard';
import Link from 'next/link';
import { Helmet } from 'react-helmet';

interface Episode {
  id: number;
  poster: {
    url: string
    alt: string
  }
  createdAt: string
  title: string;
  video: string;
}

interface Season {
  id: string;
  number: number;
  episodes: Episode[];
}

interface Series {
  id: string;
  name: string;
  poster: {
    url: string
    alt: string
  }
  description: string
  seasons: Season[];
}

interface Data {
  id: string;
  name: string;
  poster: {
    url: string
    alt: string
  }
  description: string
  seasons: {
    id: string;
    seasonNumber: string;
    episodes: {
      poster: {
        url: string
        alt: string
      };
      createdAt: any;
      episodeNumber: number;
      episodeTitle: string;
      video: string;
    }[];
  }[];
}

interface Props {
  Data: Data[];
}
export const metadata: Metadata = {
  title: {
    absolute: ''
  },
  openGraph: {
    title: '',
    description: '',
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
    authors: ['Chikiimass', 'Chikiimass'],
  },
  twitter: {
    card: 'summary_large_image',
    title: ' | Chikiimass',
    description: '',
    siteId: '',
    creator: '@chikiimass',
    creatorId: '',
    images: ['https://nextjs.org/og.png'],
  },
}

{/*export default function InfoPage({ Data }: Props) {
  const [series, setSeries] = useState<Series | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSeriesInfo = () => {
      try {
        const data = Data;
        if (!data.length) {
          setError('Series not found');
          setLoading(false);
          return;
        }

        const formattedSeries: Series = {
          id: data[0].id,
          name: data[0].name,
          poster: data[0].poster,
          description: data[0].description,
          seasons: data[0].seasons.map((season) => ({
            number: parseInt(season.seasonNumber, 10),
            episodes: season.episodes.map((episode) => ({
              id: episode.episodeNumber,
              title: episode.episodeTitle,
              video: episode.video,
            })),
          })),
        };

        setSeries(formattedSeries);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchSeriesInfo();
  }, [Data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <pre>{JSON.stringify(series, null, 2)}</pre>
      <h1 className="text-2xl font-bold mb-4">{series?.name}</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">Seasons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {series?.seasons.map((season) => (
            <div
              key={season.number}
              className="p-4 border rounded shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-medium">Season {season.number}</h3>
              <div className="mt-2">
                {season.episodes.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => router.push(`/videos/${series.name}/season/${season.number}/episode/${ep.id}`)}
                    className="block text-primary hover:text-blue-700"
                  >
                    Episode {ep.id}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}*/}


export default function InfoPage({ Data }: Props) {
  const [selectedSeason, setSelectedSeason] = useState(Data[0]?.seasons[0]);
  const [isSticky, setIsSticky] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const [series, setSeries] = useState<Series | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchSeriesInfo = () => {
      try {
        const data = Data;
        if (!data.length) {
          setError('Series not found');
          setLoading(false);
          return;
        }

        const formattedSeries: Series = {
          id: data[0].id,
          name: data[0].name,
          poster: data[0].poster,
          description: data[0].description,
          seasons: data[0].seasons.map((season) => ({
            id: season.id,
            number: parseInt(season.seasonNumber, 10),
            episodes: season.episodes.map((episode) => ({
              id: episode.episodeNumber,
              poster: episode.poster,
              createdAt: episode.createdAt,
              title: episode.episodeTitle,
              video: episode.video,
            })),
          })),
        };

        setSeries(formattedSeries);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchSeriesInfo();
  }, [Data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log('data', Data)
  return (
    <div className="container">
      <Helmet>
        <title>{series?.name} - Chikiimass</title>
      </Helmet>
      <div key={series?.id} className="image-container">
        <img
          src={series?.poster.url}
          alt={series?.poster.alt}
          className="series-image"
        />
        <div className="image-overlay" ref={titleRef}>
          <h1 className="image-title">{series?.name}</h1>
          <p className="image-subtitle">{series?.description}</p>
        </div>
      </div>

      {/* Sticky Header */}
      {isSticky && (
        <div className="sticky-header">
          <h1 className="sticky-title">{series?.name}</h1>
        </div>
      )}
      {/* Seasons and Episodes */}
      <div className="details-container">
        <div key={series?.id}>
          {series?.seasons.map((season) => {
            return (
              <div>
                {/* Tabs for Seasons */}
                <div className="season-tabs">
                  <button
                    key={series?.id}
                    className={`season-tab ${selectedSeason === season?.id ? "active" : ""}`}
                    onClick={() => setSelectedSeason(season?.id)}
                  >
                    {`${season?.number}`}
                  </button>
                </div>
                {/* Cards for Episodes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {season.episodes.map((episode, index) => {
                    const dateStr: string = episode?.createdAt;
                    const format = formatTime(dateStr);
                    return (
                      <Link href={`/videos/${series?.name}/season/${season.number}/episode/${episode.id}`} key={index}>
                        <ChannelCard
                          thumbnail={episode.poster?.url || ''}
                          alt={episode.poster?.alt || 'alt text'}
                          title={episode.title}
                          name={series?.name}
                          views={episode.id}
                          published={format}
                        />
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .container {
          max-width: 100%;
          margin: 0 auto;
          padding: 0;
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 400px;
        }

        .series-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          text-align: center;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0), oklch(var(--b1)));
          color: white;
          padding: 20px 10px;
          border-radius: 0 0 10px 10px;
        }

        .image-title {
          margin: 0;
          font-size: 30px;
          font-weight: bold;
        }

        .image-subtitle {
          color: #F3F4F6;
          font-size: 16px;
        }

        .sticky-header {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          background: oklch(var(--b1));
          text-align: left;
          padding: 10px 20px;
          z-index: 10;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .sticky-title {
          margin: 0;
          font-size: 20px;
          font-weight: bold;
        }

        .details-container {
          margin-top: 20px;
          padding: 0 20px 0 20px;
        }

        .season-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .season-tab {
          padding: 10px 20px;
          border-bottom: 2px solid #ccc;
          cursor: pointer;
        }

        .season-tab.active {
          border-color: oklch(var(--p));
          color: oklch(var(--p));
        }

        .episodes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .episode-card {
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .episode-card h2 {
          margin: 0 0 10px;
          font-size: 18px;
          font-weight: bold;
        }

        .episode-card p {
          margin: 0;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}