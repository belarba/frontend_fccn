import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onSearch, onToggleFilters, filterButtonRef }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    
    // If we're on the home page and onSearch is provided, use it
    if (onSearch) {
      onSearch(query);
    } else {
      // If we're on the video detail page or another page,
      // navigate to the home page with the search query as a URL parameter
      navigate(`/?q=${encodeURIComponent(query)}`);
    }
  };

  const handleFilterClick = (e) => {
    e.preventDefault();
    if (onToggleFilters) {
      onToggleFilters();
    }
  };

  return (
    <div className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={() => setQuery('')}>
          <div className="logo-icon">P</div>
          Pexels
        </Link>
        
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar vídeos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="search-buttons">
            <button type="submit" className="search-button">
              <span role="img" aria-label="search">🔍</span>
            </button>
            {onToggleFilters && (
              <button 
                type="button" 
                className="filter-button" 
                onClick={handleFilterClick}
                ref={filterButtonRef}
              >
                <span role="img" aria-label="filter">⚙️</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;