import { Block } from "payload"

const Hero: Block = {
    slug: 'Hero',
    labels: {
        singular: 'Hero Block',
        plural: 'Hero Blocks',
    },
    fields: [
        {
            name: 'header',
            label: 'Header',
            type: 'text',
        },
        {
            name: 'text',
            label: 'Text',
            type: 'textarea',
        },
        {
            name: 'background',
            label: 'Background',
            type: 'upload',
            relationTo: 'media',
        }
    ]
}

export default Hero