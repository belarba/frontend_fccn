import React from 'react';
import { Link } from 'react-router-dom';
import './VideoList.css';

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const VideoItem = ({ video, gridView }) => {
  const { id, user_name, duration, video_pictures } = video;
  
  // Escolher a miniatura com melhor qualidade disponível
  const thumbnail = video_pictures && video_pictures.length > 0 
    ? video_pictures[0] 
    : 'https://via.placeholder.com/640x360?text=Sem+Imagem';

  return (
    <div className={`video-item ${gridView ? 'grid-view' : 'list-view'}`}>
      <Link to={`/video/${id}`} className="video-link">
        <div className="video-thumbnail">
          <img src={thumbnail} alt={`Vídeo de ${user_name}`} />
          <div className="video-play-icon"></div>
        </div>
        {!gridView && (
          <div className="video-info">
            <h3 className="video-title">{user_name}</h3>
            <div className="video-meta">
              <span className="video-meta-item">ID: {id}</span>
              <span className="video-meta-item">Duração: {formatDuration(duration)}</span>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default VideoItem;