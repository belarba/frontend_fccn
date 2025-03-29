import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Função para gerar o array de páginas a serem exibidas
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let pages = [];

    if (totalPages <= maxPagesToShow) {
      // Se houver poucas páginas, mostra todas
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Se houver muitas páginas, mostrar algumas com elipses
      if (currentPage <= 3) {
        // Caso esteja nas primeiras páginas
        pages = [1, 2, 3, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        // Caso esteja nas últimas páginas
        pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
      } else {
        // Caso esteja no meio
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      <button 
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      
      <div className="pagination-numbers">
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="pagination-ellipsis">...</span>
            ) : (
              <button
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <button 
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próxima
      </button>
    </div>
  );
};

export default Pagination;