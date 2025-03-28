import React, { useState } from 'react';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import LocaleFilter from '../components/Filters/LocaleFilter';
import ResolutionFilter from '../components/Filters/ResolutionFilter';
import ViewModeFilter from '../components/Filters/ViewModeFilter';
import VideoList from '../components/VideoList/VideoList';
import Pagination from '../components/Pagination/Pagination';
import useVideos from '../hooks/useVideos';

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

  // Handler para filtro de localidade
  const handleLocaleChange = (locale) => {
    updateSearchParams({ locale });
  };

  // Handler para filtro de resolução
  const handleResolutionChange = (size) => {
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
    <div className="home-page">
      <Header />
      
      <main className="container">
        <SearchBar 
          onSearch={handleSearch} 
          initialQuery={searchParams.query} 
        />
        
        <div className="filters-container">
          <LocaleFilter 
            value={searchParams.locale} 
            onChange={handleLocaleChange} 
          />
          <ResolutionFilter 
            value={searchParams.size} 
            onChange={handleResolutionChange} 
          />
          <ViewModeFilter 
            isGridView={isGridView} 
            onChange={handleViewModeChange} 
          />
        </div>
        
        <VideoList 
          videos={videos} 
          loading={loading} 
          error={error} 
          gridView={isGridView} 
        />
        
        <Pagination 
          currentPage={pagination.page} 
          totalPages={pagination.total_pages} 
          onPageChange={handlePageChange} 
        />
      </main>
    </div>
  );
};

export default HomePage;