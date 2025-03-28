import React from 'react';
import VideoItem from './VideoItem';
import './VideoList.css';

const VideoList = ({ videos, loading, error, gridView }) => {
  if (loading) {
    return (
      <div className="video-list-message">
        <p>Carregando vídeos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="video-list-message error">
        <p>Erro ao carregar vídeos: {error}</p>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="video-list-message">
        <p>Nenhum vídeo encontrado. Tente ajustar sua busca.</p>
      </div>
    );
  }

  return (
    <div className={`video-list ${gridView ? 'grid-layout' : 'list-layout'}`}>
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} gridView={gridView} />
      ))}
    </div>
  );
};

export default VideoList;