import ChannelCard from "@/app/components/UI/ChannelCard";
import Link from "next/link";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";

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

const Home = async () => {
  const payload = await getPayloadHMR({ config: configPromise });
  const series = await payload.find({
    collection: "series",
  });

  return (
        <div className="mx-auto">
          <div className="carousel w-full">
            {/* Carousel images */}
            {[
              "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg",
              "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg",
              "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg",
              "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg",
            ].map((image, index) => (
              <div key={index} className="carousel-item w-full">
                <img src={image} className="w-[422px]  xs:aspect-video" />
              </div>
            ))}
          </div>
          {/* Channels */}
          {["Keep Watching", "Favorites", "Trending", "Popular"].map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">{category}</h2>
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
            {series.docs.map((item) => {
              const { id, name, createdAt, poster } = item as {
                id: string;
                name: string;
                createdAt: Date;
                poster: { url: string; alt: string; };
              };
              return (
                <Link href={`/v/${id}`} key={id}>
                  <ChannelCard
                    title={name}
                    thumbnail={poster.url}
                    name={name}
                    views={id.toString()}
                    published={createdAt.toISOString()}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;