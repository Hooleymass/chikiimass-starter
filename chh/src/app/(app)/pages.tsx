import React from 'react'
import ChannelCard from '@/app/components/UI/ChannelCard'
import Link from 'next/link'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import AutoCarousel from './Carousel'
import formatTime  from '@/app/lib/formatTime'

interface Homeprops {
  id: number
  name: string
  views: string
  published: any;
  poster: {
    url: string
  }
}

/**
 * This component is the main page of the application.
 * It fetches data from the payload API and displays it to the user.
 *
 * The component uses the `getPayloadHMR` function to get the payload instance.
 * It then uses the `find` method to fetch data from the "series" collection.
 * The fetched data is stored in the `series` state variable.
 *
 * The component renders a carousel of images and a list of channels.
 * The carousel is created using the `carousel` class from the DaisyUI library.
 * Each image is rendered inside a `carousel-item` div.
 * The channels are rendered inside a `flex` div with `overflow-x-auto` and `scrollbar-hide` classes.
 * Each channel is rendered inside a `Link` component that links to the channel page.
 * The `ChannelCard` component is used to render each channel.
 * The `map` method is used to iterate over the `series.docs` array and render a `ChannelCard` component for each item.
 *
 * The component is exported as the default export.
 */

const payload = await getPayloadHMR({ config: configPromise })
const series = await payload.find({
  collection: 'series',
  depth: 2,
})


const Home: React.FC<Homeprops> = () => {
  return (
    <div className="mx-auto">
      <AutoCarousel image1={series.docs[0]?.poster.url} image2={series.docs[0]?.poster.url} image3={series.docs[0]?.poster.url} image4={series.docs[0]?.poster.url}/>
      {['Keep Watching', 'Favorites', 'Trending', 'Popular'].map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 pl-2">{category}</h2>
          {series.docs.map((item) => {
            const {
              id: seriesId,
              name,
              seasons,
            } = item as {
              id: string
              name: string
              seasons: any
            }
            return (
              <div key={seriesId}>
                {seasons.map((season: { id: string; seasonNumber: string; episodes: any }) => {
                  const {
                    id: seasonId,
                    seasonNumber,
                    episodes,
                  } = season as {
                    id: string
                    seasonNumber: string
                    episodes: any
                  }
                  return (
                    <div key={seasonId}>
                      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
                        {episodes.map((episode: { episodeNumber: string; episodeTitle: string; poster: { url: string; alt: string } }, index: any) => {
                          const {
                            episodeNumber: episodeId,
                            episodeTitle,
                            poster,
                            createdAt: episodecreatedAt
                          } = episode as {
                            episodeNumber: string
                            episodeTitle: string
                            poster: { url: string; alt: string }
                            createdAt: string;
                          }
                          const dateStr: string = episodecreatedAt;
                          const format = formatTime(dateStr);
                          return (
                            <Link href={`/videos/${name}/season/${seasonNumber}/episode/${episodeId}`} key={index}>
                              <ChannelCard
                                thumbnail={poster?.url || ''}
                                alt={poster?.alt || 'alt text'}
                                title={episodeTitle}
                                name={name}
                                views={episodeId}
                                published={format}
                              />
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Home

/**
 * Typescript has several intrinsic types that are built into the language,
 * allowing you to define the type of a variable without needing to import a library.
 * Here are some of the most commonly used built-in types:
 *
 * - `boolean`: a type that can have the value `true` or `false`.
 * - `number`: a type that can represent numbers, both integers and floating point numbers.
 * - `string`: a type that can represent sequences of characters.
 * - `object`: a type that can represent any non-primitive value, including arrays, functions, and objects.
 * - `null`: a type that represents the absence of a value.
 * - `undefined`: a type that represents a value that has not been assigned a value.
 * - `void`: a type that represents the absence of any value.
 *
 * When fetching data from an API, you may encounter other types that are not intrinsic,
 * such as `Date` and `Promise`.
 *
 * - `Date`: a type that represents a specific moment in time. You can create a new `Date` object by passing in a string representing the date and time, or by not passing in any arguments.
 * - `Promise`: a type that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. You can use the `fetch` function to make an asynchronous request to an API and get a `Promise` that resolves to the response.
 *
 * Here's an example of how you can fetch data from an API using the `fetch` function and the `Promise` type:
 *
 *
 */
