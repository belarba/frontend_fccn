import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import VideoDetail from '../components/VideoDetail/VideoDetail';
import useVideoDetail from '../hooks/useVideoDetail';
import './VideoPage.css';

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    video, 
    loading, 
    error,
    selectedQuality,
    setSelectedQuality,
    getAvailableQualities
  } = useVideoDetail(id);
  
  // Função de busca que será passada para o Header
  const handleSearch = (query) => {
    navigate(`/?q=${encodeURIComponent(query)}`);
  };

  // Obter as qualidades disponíveis
  const availableQualities = getAvailableQualities();
  
  return (
    <div className="video-page-wrapper">
      <header className="app-header">
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
          <VideoDetail 
            video={video}
            availableQualities={availableQualities}
            selectedQuality={selectedQuality}
            onQualityChange={setSelectedQuality}
          />
        )}
      </main>
    </div>
  );
};

export default VideoPage;