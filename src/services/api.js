import axios from 'axios';

// Configure a URL base e a chave de API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/v1';
const API_KEY = process.env.REACT_APP_API_KEY || 'seu_token_de_api';

// Cria uma instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': API_KEY
  }
});

// Função para buscar vídeos (populares ou por busca)
export const fetchVideos = async (params = {}) => {
  try {
    const response = await api.get('/videos', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
    throw error;
  }
};

// Função para buscar um vídeo específico por ID
export const fetchVideoById = async (id) => {
  try {
    const response = await api.get(`/videos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar vídeo ${id}:`, error);
    throw error;
  }
};