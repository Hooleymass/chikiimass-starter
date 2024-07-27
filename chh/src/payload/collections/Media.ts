import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: "Media",
    plural: "media",
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
