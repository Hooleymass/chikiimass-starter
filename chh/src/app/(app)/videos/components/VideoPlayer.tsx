import dynamic from 'next/dynamic';
const Player = dynamic(() => import('@/components/Player/src/components/Main'), {
    ssr: false,
  });
  
  const VideoPlayer = ({ episode }) => {
    return (
        <div className=''>

            <Player
            src={`${episode}`}
            subtitles={[
              {
                lang: "en",
                language: "English",
                url: "/public/en.vtt",
              },
              {
                lang: "fr",
                language: "French",
                url: "/public/fr.vtt",
              },
            ]}
            primaryColor='purple'
            pictureInPicture={true}
          />
        </div>
    )
  }
  
  export default VideoPlayer
  