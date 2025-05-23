import React from 'react';
import { useIsMobile } from '../../hooks/useMediaQuery';
import './VideoDetail.css';
import './QualitySelector.css';

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const VideoDetail = ({ 
  video, 
  availableQualities = [],
  selectedQuality = '', 
  onQualityChange 
}) => {
  const isMobile = useIsMobile();
  
  if (!video) {
    return (
      <div className="video-detail-container loading">
        <p>Carregando vídeo...</p>
      </div>
    );
  }

  // Função para obter o vídeo com a qualidade correta
  const getVideoFile = () => {
    if (!video.video_files) {
      return null;
    }
    
    // Qualidade desejada com base no dispositivo
    const desiredQuality = selectedQuality || (isMobile ? 'sd' : 'hd');
    
    let videoFile = null;
    
    // Caso 1: video_files é um array
    if (Array.isArray(video.video_files)) {
      // Procurar por qualidade específica
      videoFile = video.video_files.find(file => 
        file.quality && file.quality.toLowerCase() === desiredQuality
      );
      
      // Se não encontrar, usar o primeiro
      if (!videoFile && video.video_files.length > 0) {
        videoFile = video.video_files[0];
      }
    } 
    // Caso 2: video_files é um objeto
    else if (typeof video.video_files === 'object') {
      // Tentar pegar diretamente a qualidade desejada
      if (video.video_files[desiredQuality]) {
        videoFile = video.video_files[desiredQuality];
      } 
      // Alternativa: tentar outras qualidades
      else {
        const qualities = ['hd', 'sd', 'full_hd', '4k'];
        for (const quality of qualities) {
          if (video.video_files[quality]) {
            videoFile = video.video_files[quality];
            break;
          }
        }
        
        // Se ainda não encontrou, pegar a primeira propriedade
        if (!videoFile) {
          const firstKey = Object.keys(video.video_files)[0];
          if (firstKey) {
            videoFile = video.video_files[firstKey];
          }
        }
      }
    }
    
    // Se o videoFile for um array (caso de objeto aninhado), pegue o primeiro item
    if (Array.isArray(videoFile)) {
      videoFile = videoFile[0];
    }
    
    return videoFile;
  };

  const videoFile = getVideoFile();
  
  const handleQualityChange = (e) => {
    if (onQualityChange) {
      onQualityChange(e.target.value);
    }
  };
  
  return (
    <div className="video-detail-container">
      <div className="container">
        <div className="video-player-wrapper">
          <div className="video-player-container">
            {videoFile && videoFile.link ? (
              <>
                <video 
                  controls 
                  autoPlay={false}
                  className="video-player"
                  poster={video.video_pictures?.[0]?.picture}
                >
                  <source src={videoFile.link} type="video/mp4" />
                  Seu navegador não suporta a reprodução de vídeos.
                </video>
                
                {availableQualities.length > 1 && (
                  <div className="quality-selector">
                    <label htmlFor="quality-select">Qualidade:</label>
                    <select 
                      id="quality-select"
                      value={selectedQuality || ''}
                      onChange={handleQualityChange}
                    >
                      {availableQualities.map(quality => (
                        <option key={quality.value} value={quality.value}>
                          {quality.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            ) : (
              <div className="video-error">
                <div className="play-placeholder">
                  <div className="play-icon"></div>
                </div>
                <p>Não foi possível carregar o vídeo.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="video-detail-info">
          {console.log(video)}
          <h1 className="video-detail-title">{video.user.name}</h1>
          
          <ul className="video-metadata-list">
            <li className="video-metadata-item">
              <strong>ID:</strong> {video.id}
            </li>
            <li className="video-metadata-item">
              <strong>Resolução:</strong> {
                videoFile ? 
                  `${videoFile.width || '?'}x${videoFile.height || '?'}` : 
                  'Desconhecida'
              }
            </li>
            <li className="video-metadata-item">
              <strong>Duração:</strong> {formatDuration(video.duration)}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;