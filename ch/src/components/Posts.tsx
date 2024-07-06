import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config'


export async function Posts() {
  const payload = await getPayloadHMR({ config })
  
  const posts = payload.find({
    collection: 'posts',
  });
  return (
    <div className='text-lg text-indigo-500 italic font-sans'>
      {
        posts.docs.map((post) => <p key={post.id}>{post.title}</p>)
      }
    </div>
  )
}