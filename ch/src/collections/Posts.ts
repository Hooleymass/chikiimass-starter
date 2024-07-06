import { CollectionConfig } from "payload";

const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
        delete: ({ req: { user } }) => user?.role === 'admin',
      },
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'category',
            type: 'text',
        },
    ]
}

export default Posts