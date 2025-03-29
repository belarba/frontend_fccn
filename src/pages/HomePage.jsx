import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header/Header';
import FilterComponent from '../components/Filters/FilterComponent';
import ViewModeFilter from '../components/Filters/ViewModeFilter';
import VideoList from '../components/VideoList/VideoList';
import Pagination from '../components/Pagination/Pagination';
import useVideos from '../hooks/useVideos';
import './HomePage.css';

const HomePage = () => {
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
    searchParams,
    updateSearchParams,
    setViewMode,
    goToPage
  } = useVideos();

  const handleSearch = (query) => {
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
      ...searchParams,
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