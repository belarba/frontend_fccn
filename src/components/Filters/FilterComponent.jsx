import React, { useState } from 'react';
import './Filters.css';

const resolutions = [
  { id: 'hd', label: 'HD' },
  { id: 'full_hd', label: 'Full HD' },
  { id: '4k', label: '4K' }
];

const FilterComponent = ({ 
  resolution = '',
  onResolutionChange
}) => {
  const [selectedResolutions, setSelectedResolutions] = useState(
    resolution ? [resolution] : []
  );
  
  const handleResolutionChange = (resId) => {
    let newResolutions;
    
    if (selectedResolutions.includes(resId)) {
      newResolutions = selectedResolutions.filter(id => id !== resId);
    } else {
      newResolutions = [...selectedResolutions, resId];
    }
    
    setSelectedResolutions(newResolutions);
    
    if (onResolutionChange) {
      // Para simplicidade, vamos passar apenas a primeira resolução selecionada
      onResolutionChange(newResolutions.length > 0 ? newResolutions[0] : '');
    }
  };
  
  return (
    <div className="filters-container">
      <h3 className="filter-category-title">Resoluções</h3>
      <div className="filter-options">
        {resolutions.map(res => (
          <label 
            key={res.id}
            className={`filter-checkbox-label ${selectedResolutions.includes(res.id) ? 'active' : ''}`}
          >
            <input 
              type="checkbox"
              className="filter-checkbox"
              checked={selectedResolutions.includes(res.id)}
              onChange={() => handleResolutionChange(res.id)}
            />
            <span className="filter-checkbox-custom"></span>
            {res.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;