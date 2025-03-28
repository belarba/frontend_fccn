import React from 'react';
import './Filters.css';

// Opções de resolução conforme solicitado
const resolutionOptions = [
  { value: '', label: 'Todas resoluções' },
  { value: 'HD', label: 'HD' },
  { value: 'FullHD', label: 'Full HD' },
  { value: '4K', label: '4K' }
];

const ResolutionFilter = ({ value, onChange }) => {
  return (
    <div className="filter-container">
      <label htmlFor="resolution-filter">Resolução:</label>
      <select
        id="resolution-filter"
        className="filter-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {resolutionOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ResolutionFilter;