// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import Posts from './payload/collections/Posts'
import Categories from './payload/collections/Categories'
import Genres from './payload/collections/Genres'
import Series from './payload/collections/Series'
import Videos from './payload/collections/Videos'
import Episodes from './payload/collections/Series/Episodes'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Posts,
    Categories,
    Genres,
    Series,
    Episodes,
    Videos,
  ],
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  editor: lexicalEditor(),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http:localhost:3000',
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
     pool: {
       connectionString: process.env.POSTGRES_URI || ''
     }
   }),
/*   db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }), */
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
