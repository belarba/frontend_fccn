import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import VideoDetail from '../components/VideoDetail/VideoDetail';
import useVideoDetail from '../hooks/useVideoDetail';
import './VideoPage.css';

const VideoPage = () => {
  const { id } = useParams();
  const { 
    video, 
    loading, 
    error
  } = useVideoDetail(id);
  
  return (
    <div className="video-page-wrapper">
      <header className="app-header">
        <Header />
      </header>
      
      <main className="video-content">
        {loading ? (
          <div className="loading-container">
            <p>Carregando vídeo...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
            <Link to="/" className="back-link">Voltar para a galeria</Link>
          </div>
        ) : (
          <VideoDetail video={video} />
        )}
      </main>
    </div>
  );
};

export default VideoPage;