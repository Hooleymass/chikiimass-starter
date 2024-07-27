'use client'
import { CustomVideoPlayer } from "./components";
import { Flex } from "./components/ui";

interface Hslprops {
  src: string;
  playingTitle: string;
}
const Hsl: React.FC<Hslprops> = ({ src="", playingTitle="" }) => {
/*   const [data, setData] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      const data = await getVideoSourcesApi();

      setData(data);
    })();
  }, []); */
  const videoLinks = [
    "http://localhost:8003/M3U8/EP.10.v1.1717697110.m3u8",
    "http://localhost:8003/M3U8/test/index.m3u8",
    src,
    "https://vod.cf.dmcdn.net/sec2(V0bd6Zj1gSyacC_vuaLYCyNqGefzdWmKmsd1sKhjTNyoQsLwygyqRhJDanVCfkuvW3KvrLJNn43LXSBoKO-brZ4WsKHp1TFyBk93PVZLpLs-UFfpHSY71aW1Qqs1DGtJX4q877tjHRUBDhDUm6QjPQ)/video/028/190/546091820_mp4_h264_aac_3.m3u8#cell=cf"
  ];

  return (
    <Flex $direction="column">
      <CustomVideoPlayer data={videoLinks} playingTitle={playingTitle}/>
    </Flex>
  );
};

export default Hsl;
