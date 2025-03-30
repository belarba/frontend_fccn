import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ onSearch, onToggleFilters, filterButtonRef }) => {
  // Use o sessionStorage para persistir o termo de busca entre páginas
  const [query, setQuery] = useState(() => {
    // Inicializa com o valor do sessionStorage, se existir
    return sessionStorage.getItem('lastSearchQuery') || '';
  });

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Salva a consulta no sessionStorage
    sessionStorage.setItem('lastSearchQuery', query);
    
    // Agora sempre usamos onSearch, pois ela é fornecida por todas as páginas
    onSearch(query);
  };

  const handleFilterClick = (e) => {
    e.preventDefault();
    if (onToggleFilters) {
      onToggleFilters();
    }
  };

  const handleLogoClick = () => {
    setQuery('');
    sessionStorage.removeItem('lastSearchQuery');
  };

  return (
    <div className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={handleLogoClick}>
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