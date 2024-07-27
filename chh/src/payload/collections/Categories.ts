import { CollectionConfig } from "payload";

const Categories: CollectionConfig = {
    slug: 'categories',
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

export default Categories