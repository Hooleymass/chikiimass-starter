'use client';
import ChannelCard from '@/app/components/UI/ChannelCard';
import formatTime from '@/app/lib/formatTime';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const seasons = ["Season 1", "Season 2", "Season 3"];

export default function Home({ series }) {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);
  const [isSticky, setIsSticky] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="container">
      {series.map((item) => {
        const {
          id: seriesId,
          name,
          poster,
          seasons,
          description
        } = item as {
          id: string
          name: string
          seasons: any
          description: any;
          poster: { url: string; alt: string; }
        }
        return (
          <>
            <div key={seriesId} className="image-container">
              <img
                src={poster.url}
                alt={poster.alt}
                className="series-image"
              />
              <div className="image-overlay" ref={titleRef}>
                <h1 className="image-title">{name}</h1>
                <p className="image-subtitle">{description}</p>
              </div>
            </div>

            {/* Sticky Header */}
            {isSticky && (
              <div className="sticky-header">
                <h1 className="sticky-title">{name}</h1>
              </div>
            )}
            {/* Seasons and Episodes */}
            <div className="details-container">
              <div key={seriesId}>
                {seasons.map((season: { id: string; seasonNumber: string; episodes: any }) => {
                  const {
                    id: seasonId,
                    seasonNumber,
                    episodes,
                  } = season as {
                    id: string
                    seasonNumber: string
                    episodes: any
                  }
                  return (
                    <div>
                      {/* Tabs for Seasons */}
                      <div className="season-tabs">
                        <button
                          key={seriesId}
                          className={`season-tab ${selectedSeason === seriesId ? "active" : ""}`}
                          onClick={() => setSelectedSeason(seriesId)}
                        >
                          {`${seasonNumber}`}
                        </button>
                      </div>
                      {/* Cards for Episodes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {episodes.map((episode: { id: string; episodeTitle: string; poster: { url: string; alt: string } }, index: any) => {
                          const {
                            id: episodeId,
                            episodeTitle,
                            poster,
                            createdAt: episodecreatedAt
                          } = episode as {
                            id: string
                            episodeTitle: string
                            poster: { url: string; alt: string }
                            createdAt: string;
                          }
                          const dateStr: string = episodecreatedAt;
                          const format = formatTime(dateStr);
                          return (
                            <Link href={`/v/${episodeId}`} key={index}>
                              <ChannelCard
                                thumbnail={poster?.url || ''}
                                alt={poster?.alt || 'alt text'}
                                title={episodeTitle}
                                name={name}
                                views={episodeId}
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
          </>
        );
      })}

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
