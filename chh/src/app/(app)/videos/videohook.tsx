/* // app/api/getSeries.ts
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';


export async function getVideo(slug: any) {
  const payload = await getPayloadHMR({ config: configPromise });
  const series = await payload.find({
    collection: 'series',
    draft: false,
    depth: 2,
    where: {
      name: {
        equals: `${slug}`,
      },
    }
  });
  return series.docs;
}
 */

import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import { unstable_cache } from 'next/cache';

// Function to generate a unique cache key for the video data based on slug
const generateVideoCacheKey = (slug: any) => {
  return `video_cache_key_${slug}`;
};

// Function to fetch video data with caching
const fetchVideoWithCache = async (slug: any) => {
  const payload = await getPayloadHMR({ config: configPromise });
  const series = await payload.find({
    collection: 'series',
    draft: false,
    depth: 2,
    where: {
      name: {
        equals: slug,
      },
    }
  });
  return series.docs;
};

export async function getVideo(slug: any) {
  // Generate the cache key using the slug
  const cacheKey = generateVideoCacheKey(slug);

  // Use unstable_cache to fetch and cache the video data
  const video = await unstable_cache(() => fetchVideoWithCache(slug), [cacheKey], {
    revalidate: 60, // Revalidate the cache every 60 seconds
    tags: [cacheKey], // Tags to identify the cached data
  })();

  return video;
}
