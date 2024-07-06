# Payload 3.0
This BETA is rapidly evolving, you can report any bugs against the repo or in the dedicated channel in Discord. Payload is running at `/admin`. An example of a custom route running the Local API can be found at `/my-route`.

You can use the Local API in your server components like this:

```jsx
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
const payload = await getPayloadHMR({ config: configPromise })

const data = await payload.find({
  collection: 'posts',
})

return <Posts data={data} />

```