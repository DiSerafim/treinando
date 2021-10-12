import axios from './axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import Video from './Video';

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get('/v2/posts');
      setVideos(response.data);
      return response;
    }
    fetchPosts();
  }, []);

  console.log(videos);

  return (
    <div className="app">
      {/* <div className="app__videos">
        <Video url="https://cdn.culturagenial.com/imagens/3cd63ac853caa4ff25d68e583f6a9682-cke.jpg" />

      </div> */}
      <div className="app__videos">
        {videos.map(
          ({ url, channel, description, song, likes, messages, shares }) => (
            <Video
            url={url}
            channel={channel}
            song={song}
            likes={likes}
            messages={messages}
            description={description}
            shares={shares}
            />
          )
        )}
      {/* <Video url="https://v16-web.tiktok.com/video/tos/alisg/tos-alisg-pve-0037/3307d00d0a7b4c3dae6118a9ea899e8b/?a=1988&br=5860&bt=2930&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=3&ds=3&er=&expire=1634000765&ft=9wMeReUL4kag3&l=2021101119054001019020909532C39AD5&lr=tiktok&mime_type=video_mp4&net=0&pl=0&policy=3&qs=0&rc=M3Y6eWk6ZjpwODMzODgzNEApZDw4OjVpZ2U3N2U7MzVmO2dzaWpqcjRnZTNgLS1kLy1zc2MtMF9gMC4xYjY1NDEzMGI6Yw%3D%3D&signature=a0938adad12b059634a5c5ee03ca0bd2&tk=0&vl=&vr="
        channel='Serafim'
        description='Criando o clone do tik-tok'
        song='Não deu para rolar o vídeo devido a direitos autorais...'
        likes='111'
        messages='456'
        shares='789'
        /> */}
      </div>
    </div>
  );
}

export default App;
