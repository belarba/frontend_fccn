import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import FilterComponent from '../components/Filters/FilterComponent';
import ViewModeFilter from '../components/Filters/ViewModeFilter';
import VideoList from '../components/VideoList/VideoList';
import Pagination from '../components/Pagination/Pagination';
import useVideos from '../hooks/useVideos';
import './HomePage.css';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [localResolution, setLocalResolution] = useState('');
  const filterRef = useRef(null);
  const filterButtonRef = useRef(null);
  
  const {
    videos,
    loading,
    error,
    pagination,
    searchParams: apiSearchParams,
    updateSearchParams,
    setViewMode,
    goToPage
  } = useVideos({ query: initialQuery });

  // Effect to handle URL search parameter changes
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    
    // Check if we're at the root URL with no query params (e.g. after clicking logo)
    const isCleanHomePage = window.location.pathname === '/' && 
                           !window.location.search;
    
    if (isCleanHomePage && apiSearchParams.query) {
      // Clear search if we're at home with no search params
      updateSearchParams({ 
        query: '',
        size: localResolution
      });
    } else if (urlQuery !== apiSearchParams.query) {
      // Update search if query parameter changed
      updateSearchParams({ 
        query: urlQuery,
        size: localResolution
      });
    }
  }, [searchParams, apiSearchParams.query, localResolution, updateSearchParams]);

  const handleSearch = (query) => {
    // Update URL search params
    setSearchParams(query ? { q: query } : {});
    
    // Update API search params
    updateSearchParams({ 
      query,
      size: localResolution
    });
    
    setShowFilters(false); // Fechar o filtro ao fazer uma busca
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleResolutionChange = (size) => {
    setLocalResolution(size);
    updateSearchParams({
      ...apiSearchParams,
      size
    });
  };

  const handleViewModeChange = (gridView) => {
    setIsGridView(gridView);
    setViewMode(gridView);
  };

  const handlePageChange = (page) => {
    goToPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fechar os filtros apenas quando clicar fora, excluindo o botão de filtro
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Não fechar se clicar no painel de filtros ou no botão de filtro
      const isFilterButtonClick = filterButtonRef.current && 
                                 filterButtonRef.current.contains(event.target);
      
      const isFilterPanelClick = filterRef.current && 
                               filterRef.current.contains(event.target);
      
      if (!isFilterButtonClick && !isFilterPanelClick) {
        setShowFilters(false);
      }
    };
    
    // Só adicione o event listener se os filtros estiverem visíveis
    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);

  return (
    <div className="page-wrapper">
      <header className="app-header">
        <Header 
          onSearch={handleSearch} 
          onToggleFilters={handleToggleFilters}
          filterButtonRef={filterButtonRef}
        />
        
        {showFilters && (
          <div className="filters-overlay" ref={filterRef}>
            <FilterComponent 
              resolution={localResolution}
              onResolutionChange={handleResolutionChange}
            />
          </div>
        )}
      </header>
      
      <main className="main-content">
        <div className="container">
          <div className="videos-toolbar">
            <div className="view-mode-container">
              <ViewModeFilter 
                isGridView={isGridView} 
                onChange={handleViewModeChange} 
              />
            </div>
          </div>
          
          <div className="videos-section">
            <VideoList 
              videos={videos} 
              loading={loading} 
              error={error} 
              gridView={isGridView} 
            />
          </div>
          
          <div className="pagination-section">
            <Pagination 
              currentPage={pagination.page} 
              totalPages={pagination.total_pages} 
              onPageChange={handlePageChange} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;