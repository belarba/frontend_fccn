import React from 'react';
import './Filters.css';

const ViewModeFilter = ({ isGridView, onChange }) => {
  return (
    <div className="filter-container view-mode-filter">
      <label>Visualização:</label>
      <div className="view-mode-buttons">
        <button
          className={`view-mode-button ${isGridView ? 'active' : ''}`}
          onClick={() => onChange(true)}
          aria-label="Visualização em grade"
          title="Grade (4 colunas)"
        >
          <i className="grid-icon">&#9783;</i>
        </button>
        <button
          className={`view-mode-button ${!isGridView ? 'active' : ''}`}
          onClick={() => onChange(false)}
          aria-label="Visualização em lista"
          title="Lista (1 coluna)"
        >
          <i className="list-icon">&#9776;</i>
        </button>
      </div>
    </div>
  );
};

export default ViewModeFilter;