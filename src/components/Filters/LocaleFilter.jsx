import React from 'react';
import './Filters.css';

// Opções de localidade conforme solicitado
const localeOptions = [
  { value: '', label: 'Todas localidades' },
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'en-US', label: 'Inglês (EUA)' },
  { value: 'es-ES', label: 'Espanhol (Espanha)' }
];

const LocaleFilter = ({ value, onChange }) => {
  return (
    <div className="filter-container">
      <label htmlFor="locale-filter">Localidade:</label>
      <select
        id="locale-filter"
        className="filter-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {localeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleFilter;