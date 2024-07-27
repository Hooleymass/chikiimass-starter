/* import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';


export async function gettv() {
  const payload = await getPayloadHMR({ config: configPromise });
  const tv = await payload.find({
    collection: 'tv',
    draft: false,
    depth: 2,
  });
  return tv;
}
 */

import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import { unstable_cache } from 'next/cache';

// Function to generate a unique cache key for the tv data
const generatetvCacheKey = () => {
  return 'tv_cache_key';
};

// Function to fetch tv data with caching
const fetchtvWithCache = async () => {
  const payload = await getPayloadHMR({ config: configPromise });
  const tv = await payload.find({
    collection: 'series',
    draft: false,
    depth: 2,
  });
  return tv;
};

export async function gettv() {
  // Generate the cache key
  const cacheKey = generatetvCacheKey();

  // Use unstable_cache to fetch and cache the tv data
  const tv = await unstable_cache(fetchtvWithCache, [cacheKey], {
    revalidate: 60, // Revalidate the cache every 60 seconds
    tags: [cacheKey], // Tags to identify the cached data
  })();

  return tv;
}
