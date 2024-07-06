import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { ChannelCard } from '../components/UI/ChannelCard'
import React from 'react';

interface PostProps {
  video: {
    id: string;
    name: string;
    poster: {
      url: string;
      alt: string;
    }
  };
}

export default async function Home() {
  const payload = await getPayloadHMR({ config: configPromise })

  const series = await payload.find({
    collection: 'series'
  })

  return (
    <div>
      {series.docs.map((series) =>(
        <ChannelCard video={series as { id: string; name: string; poster: { url: string; alt: string; } }} />
      ))}
    </div>
  )
}
