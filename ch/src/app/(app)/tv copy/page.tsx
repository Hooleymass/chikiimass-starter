import React from 'react'
import ChannelCard from '@/app/components/UI/ChannelCard';
import Link from 'next/link';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config'

const payload = await getPayloadHMR({ config: configPromise })
const tv = await payload.find({
  collection: 'series',
})

const TV = () =>  {
    const items = [
      {
        id: "1",
        title: "Zari",
        views: "135000",
        published: "9 months ago",
        thumbnail: "https://placehold.co/600x400",
      },
      {
        id: "2",
        title: "Becky",
        views: "135000",
        published: "9 months ago",
        thumbnail: "https://placehold.co/600x400",
      },
      {
        id: "3",
        title: "Jua Kali",
        views: "135000",
        published: "9 months ago",
        thumbnail: "https://placehold.co/600x400",
      },
      {
        id: "4",
        title: "Salema",
        views: "135000",
        published: "9 months ago",
        thumbnail: "https://placehold.co/600x400",
      },
      {
        id: '5',
        title: "Huba",
        views: "135000",
        published: "9 months ago",
        thumbnail: "https://placehold.co/600x400",
      },
      {
        id: '6',
        title: "Kasiri",
        views: "135000",
        published: "9 months ago",
        thumbnail: "https://placehold.co/600x400",
      },
      {
        id: '7',
        title: "WWE",
        views: "135000",
        published: "9 months ago",
        thumbnail: "https://placehold.co/600x400",
      },
      {
        id: "8",
        title: "Njoro Wa Uba",
        views: "135000",
        published: "9 months ago",
        thumbnail: "https://placehold.co/600x400",
      },
      {
        id: "9",
        title: "Perdona Nuestros Pecados",
        views: "135000",
        published: "9 months ago",
        thumbnail: "https://placehold.co/600x400",
      },
      {
        id: '10',
        title: "Jua Kali",
        views: "135000",
        published: "9 months ago",
        thumbnail: "https://placehold.co/600x400",
      },
      {
        id: '11',
        title: "Njoro Wa Uba",
        views: "135000",
        published: "9 months ago",
        thumbnail: "https://placehold.co/600x400",
      }
    ]

    return (
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">TV Shows</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <Link href={`/v/${item.id}`} key={index}>
              <ChannelCard
                title={item.title}
                alt={item.title}
                thumbnail={item.thumbnail}
                name={item.title}
                views={item.views}
                published={item.published}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  };

export default TV