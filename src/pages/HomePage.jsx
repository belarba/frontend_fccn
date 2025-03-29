import React, { useState } from 'react';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import ViewModeFilter from '../components/Filters/ViewModeFilter';
import VideoList from '../components/VideoList/VideoList';
import Pagination from '../components/Pagination/Pagination';
import useVideos from '../hooks/useVideos';
import './HomePage.css';

const HomePage = () => {
  // Estado para o modo de visualização (grade ou lista)
  const [isGridView, setIsGridView] = useState(true);
  
  // Hook personalizado para gerenciar os vídeos e filtragem
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

  // Handler para pesquisa
  const handleSearch = (query) => {
    updateSearchParams({ query });
  };

  // Handler para filtro de resolução
  const handleResolutionChange = (size) => {
    // Atualize o estado sem recarregar a página
    updateSearchParams({ size });
  };

  // Handler para modo de visualização
  const handleViewModeChange = (gridView) => {
    setIsGridView(gridView);
    setViewMode(gridView);
  };

  // Handler para mudança de página
  const handlePageChange = (page) => {
    goToPage(page);
    // Scroll para o topo da página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-wrapper">
      <header className="app-header">
        <Header />
      </header>
      
      <main className="main-content">
        <div className="container">
          <div className="search-section">
            <SearchBar 
              onSearch={handleSearch} 
              initialQuery={searchParams.query}
              resolution={searchParams.size}
              onResolutionChange={handleResolutionChange}
            />
          </div>
          
          <div className="view-options-section">
            <div className="view-options-container">
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