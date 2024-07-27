import { generateVideoThumbnail } from "@/hooks/thumbnailHook";
import { CollectionConfig } from "payload";

const Videos: CollectionConfig = {
  slug: 'videos',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'thumbnail',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ data, originalDoc }: any): Promise<any> => {
        try {
          return await generateVideoThumbnail(data, originalDoc);
        } catch (error) {
          console.error('Error in thumbnail generation hook:', error);
          throw error;
        }
      },
    ],
  },
};

export default Videos;
