// app/api/getSeries.ts
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';

export async function getSeries() {
  const payload = await getPayloadHMR({ config: configPromise });
  const series = await payload.find({
    collection: 'series',
    depth: 2,
  });
  return series.docs;
}
