import React from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import VideoDetail from '../components/VideoDetail/VideoDetail';
import useVideoDetail from '../hooks/useVideoDetail';
import './VideoPage.css';

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();
  const videoDetailHook = useVideoDetail(id);
  const { 
    video, 
    loading, 
    error
  } = videoDetailHook;
  
  // Função de busca que será passada para o Header
  const handleSearch = (query) => {
    navigate(`/?q=${encodeURIComponent(query)}`);
  };
  
  return (
    <div className="video-page-wrapper">
      <header className="app-header">
        {/* Agora passamos a função onSearch, igual à HomePage */}
        <Header onSearch={handleSearch} />
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
          <VideoDetail video={video} videoDetailHook={videoDetailHook} />
        )}
      </main>
    </div>
  );
};

export default VideoPage;