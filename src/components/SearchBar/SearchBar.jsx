import React, { useState } from 'react';
import ResolutionFilter from '../Filters/ResolutionFilter';
import './SearchBar.css';

const SearchBar = ({ onSearch, initialQuery = '', resolution, onResolutionChange }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-input-container">
          <div className="search-field">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar vídeos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              Buscar
            </button>
          </div>
          
          <div className="search-filter">
            <ResolutionFilter 
              value={resolution} 
              onChange={onResolutionChange} 
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;