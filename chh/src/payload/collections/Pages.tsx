import Hero from '@/components/blocks/Hero'
import TwoColumn from '@/components/blocks/TwoColumn'
import { CollectionConfig } from 'payload'
import React from 'react'

const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
    },
    {
      name: "layout",
      label: "Layout",
      type: "blocks",
      blocks: [
        Hero,
        TwoColumn,
      ],
    },
  ]
}

export default Pages

