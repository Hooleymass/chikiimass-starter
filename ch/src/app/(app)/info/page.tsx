import Home from "./[id]/cpage";
import { getSeries } from "./useSeasonAndStickyHeader";

export default async function Page() {
  const series = await getSeries();

  return (
    <Home series={series} />
  );
}
