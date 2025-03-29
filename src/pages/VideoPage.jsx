import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import useVideoDetail from '../hooks/useVideoDetail';
import { useIsMobile } from '../hooks/useMediaQuery';
import './VideoPage.css';

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const VideoPage = () => {
  const { id } = useParams();
  const { video, loading, error, getBestVideoFile } = useVideoDetail(id);
  const isMobile = useIsMobile();
  
  // Selecionar o arquivo de vídeo apropriado para o dispositivo atual
  const videoFile = video ? getBestVideoFile() : null;
  
  return (
    <div className="page-wrapper">
      <header className="app-header">
        <Header />
      </header>
      
      <main className="main-content">
        <div className="container">
          <div className="video-detail-container">
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
              <>
                <Link to="/" className="back-link">
                  &laquo; Voltar para a galeria
                </Link>
                
                <div className="video-player-container">
                  {videoFile ? (
                    <video 
                      controls 
                      autoPlay={false}
                      className="video-player"
                      poster={video.video_pictures[0]}
                    >
                      <source src={videoFile.link} type={videoFile.file_type || 'video/mp4'} />
                      Seu navegador não suporta a reprodução de vídeos.
                    </video>
                  ) : (
                    <div className="video-error">
                      <p>Não foi possível carregar o vídeo.</p>
                    </div>
                  )}
                </div>
                
                <div className="video-detail-info">
                  <div className="video-detail-header">
                    <h1 className="video-detail-title">Vídeo #{video.id}</h1>
                  </div>
                  
                  <div className="video-detail-metadata">
                    <div className="metadata-row">
                      <div className="metadata-item">
                        <span className="metadata-label">Autor:</span>
                        <span className="metadata-value">{video.user.name}</span>
                      </div>
                      
                      <div className="metadata-item">
                        <span className="metadata-label">ID:</span>
                        <span className="metadata-value">{video.id}</span>
                      </div>
                    </div>
                    
                    <div className="metadata-row">
                      <div className="metadata-item">
                        <span className="metadata-label">Resolução:</span>
                        <span className="metadata-value">{video.resolution}</span>
                      </div>
                      
                      <div className="metadata-item">
                        <span className="metadata-label">Duração:</span>
                        <span className="metadata-value">{formatDuration(video.duration)}</span>
                      </div>
                    </div>
                    
                    <div className="metadata-row">
                      <div className="metadata-item">
                        <span className="metadata-label">Dimensões:</span>
                        <span className="metadata-value">{video.width}x{video.height}</span>
                      </div>
                      
                      <div className="metadata-item">
                        <span className="metadata-label">Qualidade:</span>
                        <span className="metadata-value">
                          {isMobile ? 'SD (Otimizado para Mobile)' : 'HD (Desktop)'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="metadata-row full-width">
                      <div className="metadata-item">
                        <span className="metadata-label">Fonte:</span>
                        <a 
                          href={video.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="metadata-link"
                        >
                          Ver no Pexels
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoPage;