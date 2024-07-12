import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  labels: {
    singular: "Media",
    plural: "media",
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
