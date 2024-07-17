import { CollectionConfig } from "payload";

const Episodes: CollectionConfig = {
    slug: 'episodes',
    labels: {
        singular: 'Episode',
        plural: 'Episodes',
    },
    admin: {
        useAsTitle: 'episodeTitle',
    },
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
            name: 'duration',
            label: 'Duration',
            type: 'number',
            admin: {
                readOnly: true,
            },
        },
    ]
}

export default Episodes;