/* import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';


export async function getSeries() {
  const payload = await getPayloadHMR({ config: configPromise });
  const series = await payload.find({
    collection: 'series',
    draft: false,
    depth: 2,
  });
  return series;
}
 */

import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import { unstable_cache } from 'next/cache';

// Function to generate a unique cache key for the series data
const generateSeriesCacheKey = () => {
  return 'series_cache_key';
};

// Function to fetch series data with caching
const fetchSeriesWithCache = async () => {
  const payload = await getPayloadHMR({ config: configPromise });
  const series = await payload.find({
    collection: 'series',
    draft: false,
    depth: 2,
  });
  return series;
};

export async function getSeries() {
  // Generate the cache key
  const cacheKey = generateSeriesCacheKey();

  // Use unstable_cache to fetch and cache the series data
  const series = await unstable_cache(fetchSeriesWithCache, [cacheKey], {
    revalidate: 60, // Revalidate the cache every 60 seconds
    tags: [cacheKey], // Tags to identify the cached data
  })();

  return series;
}
