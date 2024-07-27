import { CollectionConfig } from "payload";

const Series: CollectionConfig = {
    slug: 'series',
    admin: {
        useAsTitle: 'name'
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
            required: true
        },
        {
            name: 'poster',
            type: 'upload',
            relationTo: 'media'
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
                    type: 'number'
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
                            relationTo: 'media'
                        },
                        {
                            name: 'episodeNumber',
                            label: 'Episode',
                            type: 'number'
                        },
                        {
                            name: 'episodeTitle',
                            label: 'Episode Title',
                            type: 'text'
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
                            name: 'createdAt',
                            label: 'Date',
                            type: 'date',
                        },
                    ],
                },
            ]
        },
        {
            name: 'genres',
            label: 'Genres',
            type: 'relationship',
            relationTo: 'genres',
            hasMany: true
        },
        {
            name: 'categories',
            label: 'Categories',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: true
        },
    ]
}

export default Series;