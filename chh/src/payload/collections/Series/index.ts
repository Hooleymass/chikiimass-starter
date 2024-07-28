import { CollectionConfig, FieldHook } from "payload";
import axios from "axios";

const autoFillPublishedAt: FieldHook = ({ value }) => {
  if (!value) {
    return new Date().toISOString();
  }
  return value;
};

const extractVideoDuration: FieldHook = async ({ data }) => {
  const videoUrl = data?.video;
  if (videoUrl) {
    try {
      const response = await axios.head(videoUrl);
      const contentDuration = response.headers['content-duration'];
      if (contentDuration) {
        return parseFloat(contentDuration);
      }
      // Fallback to fetch duration using a different method if necessary
      return null;
    } catch (error) {
      console.error(`Error fetching video metadata: ${error.message}`);
      return null;
    }
  }
  return null;
};

const Series: CollectionConfig = {
  slug: 'series',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'releaseddate',
      label: 'Released Date',
      type: 'date',
    },
    {
      name: 'seasons',
      label: 'Seasons',
      type: 'array',
      fields: [
        {
          name: 'seasonNumber',
          label: 'Season Number',
          type: 'number',
        },
        {
          name: 'seasonDescription',
          label: 'Season Description',
          type: 'textarea',
        },
        {
          name: 'episodes',
          label: 'Episodes',
          type: 'array',
          fields: [
            {
              name: 'poster',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'episodeNumber',
              label: 'Episode',
              type: 'number',
            },
            {
              name: 'episodeTitle',
              label: 'Episode Title',
              type: 'text',
            },
            {
              name: 'episodeDescription',
              label: 'Episode Description',
              type: 'textarea',
            },
            {
              name: 'video',
              label: 'Video Link',
              type: 'text',
            },
            {
              name: 'duration',
              type: 'number',
              hooks: {
                beforeChange: [extractVideoDuration],
              },
            },
            {
              name: 'publishedAt',
              type: 'date',
              hooks: {
                beforeChange: [autoFillPublishedAt],
              },
            },
          ],
        },
      ],
    },
    {
      name: 'genres',
      label: 'Genres',
      type: 'relationship',
      relationTo: 'genres',
      hasMany: true,
    },
    {
      name: 'categories',
      label: 'Categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
  ],
};

export default Series;
