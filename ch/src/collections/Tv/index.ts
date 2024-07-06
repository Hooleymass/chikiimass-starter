import { CollectionConfig } from "payload";

const Tv: CollectionConfig = {
    slug: 'tv',
    admin: {
        useAsTitle: "name"
    },
    fields: [
        {
            name: 'name',
            type:'text'
        }
    ]
}

export default Tv