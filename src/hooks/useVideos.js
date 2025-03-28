import { useState, useEffect, useCallback } from 'react';
import { fetchVideos } from '../services/api';

const useVideos = (initialParams = {}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 16, // Padrão para exibição em grade
    total_pages: 0
  });
  const [searchParams, setSearchParams] = useState({
    query: '',
    size: '',
    ...initialParams
  });

  // Função para buscar vídeos com os parâmetros atuais
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

  // Carregar vídeos quando os parâmetros mudarem
  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  // Atualizar parâmetros de busca e resetar para página 1
  const updateSearchParams = (newParams) => {
    setSearchParams(prev => ({
      ...prev,
      ...newParams
    }));
    setPagination(prev => ({
      ...prev,
      page: 1 // Resetar para página 1 quando mudar parâmetros
    }));
  };

  // Função para alternar entre modos de visualização (grade ou lista)
  const setViewMode = (isGridView) => {
    setPagination(prev => ({
      ...prev,
      per_page: isGridView ? 16 : 10, // 16 para grade, 10 para lista
      page: 1 // Resetar para página 1 ao mudar visualização
    }));
  };

  // Função para mudar de página
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