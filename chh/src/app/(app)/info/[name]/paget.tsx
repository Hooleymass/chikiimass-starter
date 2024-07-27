'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Episode {
  number: number;
  title: string;
  video: string;
}

interface Season {
  number: number;
  episodes: Episode[];
}

interface Series {
  name: string;
  seasons: Season[];
}

export default function SeriesInfoPage({ params }: { params: { seriesname: string } }) {
  const { name: seriesname } = params;
  const [series, setSeries] = useState<Series | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeriesInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3001/tvseries?name=${seriesname}`);
        const data = await response.json();
        if (!data.length) {
          setError('Series not found');
          setLoading(false);
          return;
        }

        setSeries(data[0]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchSeriesInfo();
  }, [seriesname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
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
                    key={ep.number}
                    onClick={() => window.location.href = `/${seriesname}/season/${season.number}/episode/${ep.number}`}
                    className="block text-blue-500 hover:text-blue-700"
                  >
                    Episode {ep.number}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
