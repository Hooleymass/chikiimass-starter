import { getVideo } from "../videohook";
import VideoPage from "../components/page";


export default async function Page({ params }: { params: { slug: string } }) {
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
