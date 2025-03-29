import React, { useState } from 'react';
import ResolutionFilter from '../Filters/ResolutionFilter';
import './SearchBar.css';

const SearchBar = ({ onSearch, initialQuery = '', resolution, onResolutionChange }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleResolutionChange = (value) => {
    if (onResolutionChange) {
      onResolutionChange(value);
    }
  };

  // Função para lidar com a busca
  const executeSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <div className="search-field">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar vídeos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                executeSearch();
              }
            }}
          />
        </div>
        
        <div className="search-filter">
          <ResolutionFilter 
            value={resolution} 
            onChange={handleResolutionChange} 
          />
        </div>
        
        <button 
          type="button" 
          className="search-button"
          onClick={executeSearch}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;