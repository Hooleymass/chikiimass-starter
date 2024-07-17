import { CollectionConfig } from "payload";

const Tv: CollectionConfig = {
    slug: 'tv',
    admin: {
        useAsTitle: "name"
    },
    fields: [
        {
            name: 'name',
            label: 'Name',
            type:'text'
        },
        {
            name: 'streamUrl',
            label: 'Stream Url',
            type:'text'
        }
    ]
}

export default Tv