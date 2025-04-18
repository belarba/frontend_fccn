import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header/Header'; 

describe('Header Component', () => {
  test('renderiza o logo e campo de busca', () => {
    render(
      <BrowserRouter future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Pexels')).toBeInTheDocument();
    
    expect(screen.getByPlaceholderText('Buscar vídeos...')).toBeInTheDocument();
  });
});