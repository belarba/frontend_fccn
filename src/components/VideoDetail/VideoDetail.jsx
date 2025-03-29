import React, { useEffect } from 'react';
import { useIsMobile } from '../../hooks/useMediaQuery';
import './VideoDetail.css';

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const VideoDetail = ({ video }) => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (video) {
      console.log('VIDEO OBJECT STRUCTURE:', {
        has_video_files: !!video.video_files,
        video_files_type: typeof video.video_files,
        is_array: Array.isArray(video.video_files),
        keys: !Array.isArray(video.video_files) && typeof video.video_files === 'object' 
          ? Object.keys(video.video_files) 
          : 'N/A',
        length: Array.isArray(video.video_files) ? video.video_files.length : 'N/A'
      });
    }
  }, [video]);
  
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
      console.log('No video_files property found');
      return null;
    }
    
    // Qualidade desejada com base no dispositivo
    const desiredQuality = isMobile ? 'sd' : 'hd';
    console.log('Desired quality:', desiredQuality);
    
    let videoFile = null;
    
    // Caso 1: video_files é um array
    if (Array.isArray(video.video_files)) {
      console.log('video_files is array with length:', video.video_files.length);
      
      // Procurar por qualidade específica
      videoFile = video.video_files.find(file => 
        file.quality && file.quality.toLowerCase() === desiredQuality
      );
      
      // Se não encontrar, usar o primeiro
      if (!videoFile && video.video_files.length > 0) {
        videoFile = video.video_files[0];
        console.log('Using first video file as fallback');
      }
    } 
    // Caso 2: video_files é um objeto
    else if (typeof video.video_files === 'object') {
      console.log('video_files is object with keys:', Object.keys(video.video_files));
      
      // Tentar pegar diretamente a qualidade desejada
      if (video.video_files[desiredQuality]) {
        videoFile = video.video_files[desiredQuality];
        console.log('Found quality in object format');
      } 
      // Alternativa: tentar outras qualidades
      else {
        const qualities = ['hd', 'sd', 'full_hd', '4k'];
        for (const quality of qualities) {
          if (video.video_files[quality]) {
            videoFile = video.video_files[quality];
            console.log('Using alternative quality:', quality);
            break;
          }
        }
        
        // Se ainda não encontrou, pegar a primeira propriedade
        if (!videoFile) {
          const firstKey = Object.keys(video.video_files)[0];
          if (firstKey) {
            videoFile = video.video_files[firstKey];
            console.log('Using first key as last resort:', firstKey);
          }
        }
      }
    }
    
    // Se o videoFile for um array (caso de objeto aninhado), pegue o primeiro item
    if (Array.isArray(videoFile)) {
      console.log('videoFile is an array, extracting first item');
      videoFile = videoFile[0];
    }
    
    console.log('Selected video file:', videoFile);
    return videoFile;
  };

  const videoFile = getVideoFile();
  
  return (
    <div className="video-detail-container">
      <div className="container">
        <div className="video-player-wrapper">
          <div className="video-player-container">
            {videoFile && videoFile.link ? (
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
                <div className="play-placeholder">
                  <div className="play-icon"></div>
                </div>
                <p>Não foi possível carregar o vídeo.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="video-detail-info">
          <h1 className="video-detail-title">{video.user_name || 'Nome do autor'}</h1>
          
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