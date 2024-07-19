import VideoPage from "../components/page";
import { getVideo } from "../videohook";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: any;
  searchParams: any;
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Read route params
  const { slug } = params;
  const [seriesname, seasonStr, seasonnumber, episodeStr, episodenumber] = slug;
  const series = await getVideo(seriesname);

  const previousImages = (await parent).openGraph?.images || [];
  
  const imageUrl = series.docs?.[0].poster?.url || "";
  const imageAlt = series.docs?.[0].poster?.alt || "";
  const createdAt = series.docs?.[0].createdAt || "";

  return {
    title: `${seriesname} ${seasonStr} ${seasonnumber} ${episodeStr} ${episodenumber}`,
    openGraph: {
      title: `${seriesname} ${seasonStr} ${seasonnumber} ${episodeStr} ${episodenumber}`,
      description: "Enjoy the videos and music you love, and share it all with friends, family, and the world on ChikiiMass.",
      url: `https://${seriesname}/${seasonStr}/${seasonnumber}/${episodeStr}/${episodenumber}`,
      siteName: 'chikiimass',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: imageAlt,
        },
        ...previousImages
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: createdAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${seriesname} ${seasonStr} ${seasonnumber} ${episodeStr} ${episodenumber}`,
      creator: '@chikiimass',
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
        ...previousImages
      ]
    }
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const [seriesname, seasonStr, seasonnumber, episodeStr, episodenumber] = slug;
  const series = await getVideo(seriesname);

  return (
    <div>
      <VideoPage
        refu={slug}
        Data={series}
        seriesName={seriesname}
        seasonStr={seasonStr}
        seasonNumber={seasonnumber}
        episodeStr={episodeStr}
        episodeNumber={episodenumber}
      />
    </div>
  );
}
