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
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <select
      className="resolution-select"
      value={value}
      onChange={handleChange}
      aria-label="Filtrar por resolução"
    >
      {resolutionOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default ResolutionFilter;