import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination/Pagination';

describe('Pagination Component', () => {
  test('não renderiza quando totalPages é 1', () => {
    const { container } = render(
      <Pagination 
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('renderiza os botões de navegação', () => {
    render(
      <Pagination 
        currentPage={2}
        totalPages={5}
        onPageChange={() => {}}
      />
    );
    
    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Próxima')).toBeInTheDocument();
    
    const page2Button = screen.getByRole('button', { name: '2' });
    expect(page2Button).toHaveClass('active');
  });
});