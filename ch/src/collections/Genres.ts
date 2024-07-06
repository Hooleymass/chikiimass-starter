import { CollectionConfig } from "payload";

const Genres: CollectionConfig = {
    slug: 'genres',
    admin: {
        useAsTitle: 'name'
    },
    fields: [
        {
            name: 'name',
            type: 'text'
        }
    ]
}

export default Genres