import { render, screen } from '@testing-library/react';
import App from '../App';
import * as api from '../services/api';

// Mock do serviço de API
jest.mock('../services/api', () => ({
  authenticate: jest.fn(),
}));

jest.mock('../pages/HomePage', () => () => <div>HomePage Mock</div>);
jest.mock('../pages/VideoPage', () => () => <div>VideoPage Mock</div>);

test('renderiza a aplicação sem falhas quando autenticado', async () => {
  api.authenticate.mockResolvedValue(true);
  
  render(<App />);
  
  expect(screen.getByText('Autenticando...')).toBeInTheDocument();
  
  await screen.findByText('HomePage Mock');
  
  expect(document.querySelector('.app')).toBeTruthy();
});

test('mostra erro quando autenticação falha', async () => {
  api.authenticate.mockResolvedValue(false);
  
  render(<App />);

  await screen.findByText('Falha na autenticação com o servidor.');
  
  expect(document.querySelector('.app')).toBeNull();
});