import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VideoList from '../components/VideoList/VideoList';

const mockVideos = [
  {
    id: '1',
    user_name: 'Autor 1',
    duration: 120,
    video_pictures: [{ picture: 'https://example.com/thumbnail1.jpg' }]
  },
  {
    id: '2',
    user_name: 'Autor 2',
    duration: 180,
    video_pictures: [{ picture: 'https://example.com/thumbnail2.jpg' }]
  }
];

const VideoListWithRouter = (props) => (
  <BrowserRouter future={{ 
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }}>
    <VideoList {...props} />
  </BrowserRouter>
);

describe('VideoList Component', () => {
  test('renderiza mensagem de carregamento', () => {
    render(<VideoListWithRouter loading={true} />);
    
    expect(screen.getByText(/Carregando vídeos/i)).toBeInTheDocument();
  });
  
  test('renderiza mensagem de erro', () => {
    render(<VideoListWithRouter error="Erro de teste" />);
    
    expect(screen.getByText(/Erro ao carregar vídeos/i)).toBeInTheDocument();
  });
  
  test('renderiza mensagem quando não há vídeos', () => {
    render(<VideoListWithRouter videos={[]} />);
    
    expect(screen.getByText(/Nenhum vídeo encontrado/i)).toBeInTheDocument();
  });
  
  test('renderiza lista de vídeos', () => {
    render(<VideoListWithRouter videos={mockVideos} gridView={true} />);
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(2);
    
    expect(links[0]).toHaveAttribute('href', '/video/1');
    expect(links[1]).toHaveAttribute('href', '/video/2');
  });
});