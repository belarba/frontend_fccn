import { useState, useEffect, useCallback } from 'react';
import { fetchVideos } from '../services/api';

const useVideos = (initialParams = {}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 16,
    total_pages: 0
  });
  const [searchParams, setSearchParams] = useState({
    query: '',
    size: '',
    ...initialParams
  });

  const loadVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchVideos({
        ...searchParams,
        page: pagination.page,
        per_page: pagination.per_page
      });
      
      setVideos(result.items || []);
      setPagination(prev => ({
        ...prev,
        total_pages: result.total_pages || 0
      }));
    } catch (err) {
      setError(err.message || 'Erro ao buscar vídeos');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, [searchParams, pagination.page, pagination.per_page]);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const updateSearchParams = (newParams, searchNow = true) => {
    const updatedParams = {
      ...searchParams,
      ...newParams
    };
    
    setSearchParams(updatedParams);
    
    setPagination(prev => ({
      ...prev,
      page: 1
    }));
  };

  const setViewMode = (isGridView) => {
    setPagination(prev => ({
      ...prev,
      per_page: isGridView ? 16 : 10, // 16 para grade, 10 para lista
      page: 1
    }));
  };

  const goToPage = (page) => {
    setPagination(prev => ({
      ...prev,
      page
    }));
  };

  return {
    videos,
    loading,
    error,
    pagination,
    searchParams,
    updateSearchParams,
    setViewMode,
    goToPage,
    refresh: loadVideos
  };
};

export default useVideos;