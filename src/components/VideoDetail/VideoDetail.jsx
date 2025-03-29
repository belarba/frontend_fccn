import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../../hooks/useMediaQuery';
import './VideoDetail.css';

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const getResolutionLabel = (width, height) => {
  if (height >= 2160) return '4K';
  if (height >= 1080) return 'Full HD';
  if (height >= 720) return 'HD';
  return 'SD';
};

const VideoDetail = ({ video }) => {
  const isMobile = useIsMobile();
  
  if (!video) {
    return (
      <div className="video-detail-container loading">
        <p>Carregando vídeo...</p>
      </div>
    );
  }

  // Determinar qual arquivo de vídeo usar com base no dispositivo
  const getVideoFile = () => {
    if (!video.video_files || video.video_files.length === 0) {
      return null;
    }

    // Para mobile, preferir qualidade SD
    // Para desktop, preferir qualidade HD
    const preferredQuality = isMobile ? 'sd' : 'hd';
    
    // Tentar encontrar o vídeo com a qualidade preferida
    let videoFile = video.video_files.find(file => 
      file.quality && file.quality.toLowerCase() === preferredQuality
    );
    
    // Se não encontrar, usar o primeiro disponível
    if (!videoFile) {
      videoFile = video.video_files[0];
    }
    
    return videoFile;
  };

  const videoFile = getVideoFile();
  
  // Determinar a resolução do vídeo
  const resolution = videoFile 
    ? getResolutionLabel(videoFile.width, videoFile.height)
    : 'Desconhecida';

  return (
    <div className="video-detail-container">
      <Link to="/" className="back-button">
        &laquo; Voltar para a galeria
      </Link>
      
      <div className="video-player-container">
        {videoFile ? (
          <video 
            controls 
            autoPlay={false}
            className="video-player"
            poster={video.video_pictures?.[0]?.picture}
          >
            <source src={videoFile.link} type="video/mp4" />
            Seu navegador não suporta a reprodução de vídeos.
          </video>
        ) : (
          <div className="video-error">
            <p>Não foi possível carregar o vídeo.</p>
          </div>
        )}
      </div>
      
      <div className="video-detail-info">
        <h1 className="video-detail-title">Nome do autor</h1>
        
        <ul className="video-metadata-list">
          <li className="video-metadata-item">
            <strong>ID:</strong> {video.id}
          </li>
          <li className="video-metadata-item">
            <strong>Resolução:</strong> {resolution}
          </li>
          <li className="video-metadata-item">
            <strong>Duração:</strong> {formatDuration(video.duration)}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VideoDetail;