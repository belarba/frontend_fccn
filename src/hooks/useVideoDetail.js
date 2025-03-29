import { useState, useEffect } from 'react';
import { fetchVideoById } from '../services/api';
import { useIsMobile } from './useMediaQuery';

const useVideoDetail = (videoId) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const loadVideo = async () => {
      if (!videoId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchVideoById(videoId);
        setVideo(data);
        
        if (data) {
          const initialQuality = isMobile ? 'sd' : 'hd';
          setSelectedQuality(initialQuality);
        }
      } catch (err) {
        console.error('Error fetching video:', err);
        setError(err.response?.data?.error || 'Erro ao carregar o vídeo');
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [videoId, isMobile]);

  const getSelectedVideoFile = () => {
    if (!video || !video.video_files) return null;

    if (!Array.isArray(video.video_files) && typeof video.video_files === 'object') {
      if (!selectedQuality || !video.video_files[selectedQuality] || video.video_files[selectedQuality].length === 0) {
        const qualityOptions = ['uhd', 'full_hd', 'hd', 'sd'];
        for (const quality of qualityOptions) {
          if (video.video_files[quality] && video.video_files[quality].length > 0) {
            return video.video_files[quality][0];
          }
        }
        return null;
      }
      
      return video.video_files[selectedQuality][0];
    }
    
    if (Array.isArray(video.video_files)) {
      if (!selectedQuality) {
        return getBestVideoFile();
      }

      const qualities = {
        'sd': video.video_files.filter(file => 
          file.height <= 480 || 
          (file.quality && file.quality.toLowerCase() === 'sd')
        ),
        'hd': video.video_files.filter(file => 
          (file.height > 480 && file.height <= 720) || 
          (file.quality && file.quality.toLowerCase() === 'hd' && file.height <= 720)
        ),
        'full_hd': video.video_files.filter(file => 
          (file.height > 720 && file.height <= 1080) || 
          (file.quality && file.quality.toLowerCase() === 'hd' && file.height > 720 && file.height <= 1080)
        ),
        'uhd': video.video_files.filter(file => 
          file.height > 1080 || 
          (file.quality && file.quality.toLowerCase() === '4k')
        )
      };

      const filesInSelectedQuality = qualities[selectedQuality];
      
      if (!filesInSelectedQuality || filesInSelectedQuality.length === 0) {
        const qualityOptions = ['uhd', 'full_hd', 'hd', 'sd'];
        for (const quality of qualityOptions) {
          if (qualities[quality] && qualities[quality].length > 0) {
            return qualities[quality].sort((a, b) => b.height - a.height)[0];
          }
        }
        return video.video_files[0];
      }
      
      return filesInSelectedQuality.sort((a, b) => b.height - a.height)[0];
    }
    
    return null;
  };
  
  const getBestVideoFile = () => {
    if (!video || !video.video_files) return null;
    
    if (!Array.isArray(video.video_files)) {
      return getSelectedVideoFile();
    }

    if (isMobile) {
      const sdFiles = video.video_files.filter(file => 
        file.height <= 480 || 
        (file.quality && file.quality.toLowerCase() === 'sd')
      );
      
      if (sdFiles.length > 0) {
        return sdFiles.sort((a, b) => b.height - a.height)[0];
      }
    }
    
    if (!isMobile) {
      const hdFiles = video.video_files.filter(file => 
        (file.height > 480 && file.height <= 720) || 
        (file.quality && file.quality.toLowerCase() === 'hd' && file.height <= 720)
      );
      
      if (hdFiles.length > 0) {
        return hdFiles.sort((a, b) => b.height - a.height)[0];
      }
      
      const fullHdFiles = video.video_files.filter(file => 
        (file.height > 720 && file.height <= 1080) || 
        (file.quality && file.quality.toLowerCase() === 'hd' && file.height > 720)
      );
      
      if (fullHdFiles.length > 0) {
        return fullHdFiles.sort((a, b) => b.height - a.height)[0];
      }
    }
    
    const sdFiles = video.video_files.filter(file => 
      file.height <= 480 || 
      (file.quality && file.quality.toLowerCase() === 'sd')
    );
    
    if (sdFiles.length > 0) {
      return sdFiles.sort((a, b) => b.height - a.height)[0];
    }
    
    return video.video_files[0];
  };

  const getAvailableQualities = () => {
    if (!video || !video.video_files) return [];
    
    if (!Array.isArray(video.video_files) && typeof video.video_files === 'object') {
      return Object.entries(video.video_files)
        .filter(([_, files]) => files && files.length > 0)
        .map(([key, files]) => ({
          value: key,
          label: getQualityLabel(key),
          count: files.length
        }));
    }
    
    if (Array.isArray(video.video_files)) {
      const qualities = {
        'sd': {
          label: 'SD',
          files: video.video_files.filter(file => 
            file.height <= 480 || 
            (file.quality && file.quality.toLowerCase() === 'sd')
          )
        },
        'hd': {
          label: 'HD (720p)',
          files: video.video_files.filter(file => 
            (file.height > 480 && file.height <= 720) || 
            (file.quality && file.quality.toLowerCase() === 'hd' && file.height <= 720)
          )
        },
        'full_hd': {
          label: 'Full HD (1080p)',
          files: video.video_files.filter(file => 
            (file.height > 720 && file.height <= 1080) || 
            (file.quality && file.quality.toLowerCase() === 'hd' && file.height > 720 && file.height <= 1080)
          )
        },
        'uhd': {
          label: '4K',
          files: video.video_files.filter(file => 
            file.height > 1080 || 
            (file.quality && file.quality.toLowerCase() === '4k')
          )
        }
      };

      return Object.entries(qualities)
        .filter(([_, quality]) => quality.files.length > 0)
        .map(([key, quality]) => ({
          value: key,
          label: quality.label,
          count: quality.files.length
        }));
    }
    
    return [];
  };
  
  const getQualityLabel = (quality) => {
    const labels = {
      'sd': 'SD',
      'hd': 'HD (720p)',
      'full_hd': 'Full HD (1080p)', 
      'uhd': '4K'
    };
    return labels[quality] || quality.toUpperCase();
  };

  const getSelectedResolution = () => {
    const selectedFile = getSelectedVideoFile();
    if (!selectedFile) return 'Desconhecida';

    if (selectedFile.height > 1080) return '4K';
    if (selectedFile.height > 720) return 'Full HD';
    if (selectedFile.height > 480) return 'HD';
    return 'SD';
  };

  return {
    video,
    loading,
    error,
    selectedQuality,
    setSelectedQuality,
    getSelectedVideoFile,
    getAvailableQualities,
    getSelectedResolution
  };
};

export default useVideoDetail;