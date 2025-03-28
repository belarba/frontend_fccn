import { useState, useEffect } from 'react';

// Hook para detectar se o dispositivo é um dispositivo móvel
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

// Hook personalizado para detectar dispositivo móvel
export const useIsMobile = () => {
  return useMediaQuery('(max-width: 768px)');
};

export default useMediaQuery;