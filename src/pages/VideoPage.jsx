import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import VideoDetail from '../components/VideoDetail/VideoDetail';
import { fetchVideoById } from '../services/api';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const videoData = await fetchVideoById(parseInt(id, 10));
        
        if (!videoData) {
          setError('Vídeo não encontrado');
        } else {
          setVideo(videoData);
        }
      } catch (err) {
        setError(err.message || 'Erro ao carregar o vídeo');
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [id]);

  return (
    <div className="video-page">
      <Header />
      
      <main className="container">
        {loading ? (
          <div className="loading-container">
            <p>Carregando vídeo...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : (
          <VideoDetail video={video} />
        )}
      </main>
    </div>
  );
};

export default VideoPage;