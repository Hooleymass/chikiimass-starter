'use client';
import Player from '@/app/components/Player';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Episode {
  id: string;
  episodeNumber: number;
  episodeTitle: string;
  poster: {
    url: string;
  },
  episodeDescription: string;
  video: string;
}

interface Season {
  seasonNumber: number;
  episodes: Episode[];
}

interface Series {
  id: number;
  name: string;
  seasons: Season[];
}

interface VideoPageProps {
  refu: string[];
  Data: Series[];
  seriesName: string;
  seasonStr: string;
  seasonNumber: string;
  episodeStr: string;
  episodeNumber: string;
}

const VideoPage: React.FC<VideoPageProps> = ({ refu, Data, seriesName, seasonStr, seasonNumber, episodeStr, episodeNumber }) => {
  const router = useRouter();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [relatedSeasons, setRelatedSeasons] = useState<Season[]>([]);
  const [similarSeries, setSimilarSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playerError, setPlayerError] = useState(false);
  let url = typeof window !== 'undefined' ? window.location.href : '';
  url = url.replace(/\/$/, '');
  let domain = url.replace(/^(https?:\/\/)?/, '');
  domain = domain.replace(/\/$/, '');

  useEffect(() => {
    if (seasonStr.toLowerCase() !== 'season' || episodeStr.toLowerCase() !== 'episode') {
      setError('Invalid URL structure');
      setLoading(false);
      return;
    }

    const fetchEpisode = async () => {
      try {
        const data = Data;
        if (!data.length) {
          handleIncorrectSeriesName(seriesName);
          return;
        }

        const series = data.find(s => s.name.toLowerCase() === seriesName.toLowerCase());
        if (!series) {
          setError('Series not found');
          setLoading(false);
          return;
        }

        const season = series.seasons.find(s => s.seasonNumber === parseInt(seasonNumber));
        if (!season) {
          setError('Season not found');
          setLoading(false);
          return;
        }

        const episode = season.episodes.find(e => e.episodeNumber === parseInt(episodeNumber));
        if (!episode) {
          setError('Episode not found');
          setLoading(false);
          return;
        }

        setEpisode(episode);
        setEpisodes(season.episodes);
        setRelatedSeasons(series.seasons.filter(s => s.seasonNumber !== parseInt(seasonNumber)));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchEpisode();
  }, [Data, seriesName, seasonStr, seasonNumber, episodeStr, episodeNumber]);
/* 
  const handleIncompleteUrl = async (refu: string[]) => {
    if (refu.length >= 1) {
      const seriesname = refu[0];
      try {
        const data = Data;
        const series = data.find(s => s.name.toLowerCase() === seriesname.toLowerCase());
        if (series) {
          router.push(`/info/${seriesname}`);
        } else {
          handleIncorrectSeriesName(seriesname);
        }
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    } else {
      setError('Invalid URL');
      setLoading(false);
    }
  }; */

  const handleIncorrectSeriesName = async (seriesname: string) => {
    try {
      const data = Data;
      const similarSeries = data.filter(series => series.name.toLowerCase().startsWith(seriesname[0].toLowerCase()));
      setSimilarSeries(similarSeries);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (similarSeries.length > 0) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Did you mean:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {similarSeries.map((series) => (
            <div
              key={series.name}
              className="p-4 border rounded shadow hover:shadow-lg transition"
              onClick={() => router.push(`/info/${series.name}`)}
            >
              <h3 className="text-lg font-medium">{series.name}</h3>
              <div className="mt-2">
                {series.seasons.map((season) => (
                  <p key={season.seasonNumber} className="text-gray-600">
                    Season {season.seasonNumber}: {season.episodes.length} Episodes
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="lg:flex lg:space-x-4">
        <div className="lg:flex-1">
          <div className="video-container mb-4 sticky lg:sticky lg:top-auto top-0">
            {playerError ? (
              <div>
                <video controls className="w-full h-auto">
                  <source src={episode?.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <a
                  href={episode?.video}
                  download
                  className="inline-block bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                >
                  Download Video
                </a>
              </div>
            ) : (
              <Player videoUrl={episode?.video} onError={() => setPlayerError(true)} />
            )}
          </div>
          <h2 className="text-2xl font-semibold mb-2">{episode?.episodeTitle}</h2>
          <p>{episode?.episodeDescription}</p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Episodes in Season {refu[2]}</h2>
            <div className="flex flex-wrap space-x-2">
              {episodes.map((ep) => (
                <button
                  key={ep.episodeNumber}
                  onClick={() => router.push(`/${refu[0]}/season/${refu[2]}/episode/${ep.episodeNumber}`)}
                  className={`px-4 py-2 rounded ${
                    ep.episodeNumber === parseInt(refu[4])
                      ? 'bg-primary'
                      : 'bg-secondary hover:bg-blue-700'
                  }`}
                >
                  Episode {ep.episodeNumber}
                </button>
              ))}
            </div>
            <a
              className="inline-block bg-blue-500 text-white px-4 py-2 mt-2 rounded"
              onClick={(() => alert('Comming Soon..'))}
            >
              Download Video
            </a>
           {/*  <a
              href={episode?.video}
              download
              className="inline-block bg-blue-500 text-white px-4 py-2 mt-2 rounded"
              onClick={(() => alert('Comming Soon..'))}
            >
              Download Video
            </a> */}
          </div>
        </div>

        <div className="lg:w-1/4">
            <h2 className="text-xl font-semibold mb-2">Related</h2>
          <div className="p-4 border rounded shadow mb-4">
            <h3 className="text-lg font-medium">Ads. </h3>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-4">
              {relatedSeasons.map(season => (
                <Link key={season.seasonNumber} href={`/${refu[0]}/season/${season.seasonNumber}/episode/1`}>
                  <div className="p-4 border rounded shadow hover:shadow-lg transition">
                    Season {season.seasonNumber}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
