import { getSeries } from "../../hooks/useSeasonAndStickyHeader";
import InfoPage from "./components/info";

export default async function Page({ params }: { params: { name: string } }) {
  const { name: slug } = params;
  const series = await getSeries(slug);
  console.log(series)
  return (
    <div>
      <InfoPage Data={series} />
    </div>
  );
}
