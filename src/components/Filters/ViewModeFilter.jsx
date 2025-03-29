import React from 'react';
import './Filters.css';

const ViewModeFilter = ({ isGridView, onChange }) => {
  return (
    <div className="view-mode-buttons">
      <button
        className={`view-mode-button ${isGridView ? 'active' : ''}`}
        onClick={() => onChange(true)}
        aria-label="Visualização em grade"
        title="Grade (4 colunas)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </button>
      <button
        className={`view-mode-button ${!isGridView ? 'active' : ''}`}
        onClick={() => onChange(false)}
        aria-label="Visualização em lista"
        title="Lista (1 coluna)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

export default ViewModeFilter;