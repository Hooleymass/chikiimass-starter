import { getSeries } from "./getSeries";
import Home from "./Home";

//src="http://localhost:8003/EP.10.v1.1717697110.480p.mp4"
const page = async () => {
  const series = await getSeries();
  return (
    <div>
      <Home series={series}/>
    </div>
  );
}

export default page;
