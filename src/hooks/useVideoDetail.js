import { useState, useEffect } from 'react';
import { fetchVideoById } from '../services/api';
import { useIsMobile } from './useMediaQuery';

const useVideoDetail = (videoId) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const loadVideo = async () => {
      if (!videoId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchVideoById(videoId);
        setVideo(data);
      } catch (err) {
        console.error('Error fetching video:', err);
        setError(err.response?.data?.error || 'Erro ao carregar o vídeo');
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [videoId]);

  // Selecionar o melhor arquivo de vídeo com base no dispositivo
  const getBestVideoFile = () => {
    if (!video || !video.video_files) return null;

    // Para celulares, preferir qualidade SD para economizar dados
    if (isMobile) {
      if (video.video_files.sd && video.video_files.sd.length > 0) {
        return video.video_files.sd[0];
      }
    }
    
    // Para desktop, preferir HD se disponível
    if (!isMobile) {
      // Tentar HD
      if (video.video_files.hd && video.video_files.hd.length > 0) {
        return video.video_files.hd[0];
      }
      
      // Se HD não estiver disponível, tentar FullHD
      if (video.video_files.full_hd && video.video_files.full_hd.length > 0) {
        return video.video_files.full_hd[0];
      }
    }
    
    // Fallback para SD se outras qualidades não estiverem disponíveis
    if (video.video_files.sd && video.video_files.sd.length > 0) {
      return video.video_files.sd[0];
    }
    
    // Última opção: pegar o primeiro arquivo disponível em qualquer categoria
    const allFiles = [
      ...(video.video_files.sd || []),
      ...(video.video_files.hd || []),
      ...(video.video_files.full_hd || []),
      ...(video.video_files.uhd || [])
    ];
    
    return allFiles.length > 0 ? allFiles[0] : null;
  };

  return {
    video,
    loading,
    error,
    getBestVideoFile
  };
};

export default useVideoDetail;