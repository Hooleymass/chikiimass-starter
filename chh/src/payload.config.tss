import { postgresAdapter } from '@payloadcms/db-postgres'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Posts from './collections/Posts'
import Categories from './collections/Categories'
import Genres from './collections/Genres'
import Series from './collections/Series'
import Videos from './collections/Videos'
import Episodes from './collections/Series/Episodes'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const getDatabaseAdapter = () => {
  if (process.env.POSTGRES_URI) {
    return postgresAdapter({
      pool: {
        connectionString: process.env.POSTGRES_URI
      }
    })
  }
  
  if (process.env.MONGODB_URI) {
    return mongooseAdapter({
      url: process.env.MONGODB_URI
    })
  }

  throw new Error('No database URI provided')
}

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
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: getDatabaseAdapter(),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
