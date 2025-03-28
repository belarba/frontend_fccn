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

// Função para buscar um vídeo específico por ID (se necessário)
export const fetchVideoById = async (id) => {
  try {
    // Como a API não tem um endpoint específico para um vídeo, 
    // podemos simular buscando todos os vídeos e filtrando pelo ID
    const response = await api.get('/videos', { 
      params: { 
        query: id, // Pode não ser ideal, mas é uma forma de tentar encontrar o vídeo
        per_page: 20 
      } 
    });
    
    const video = response.data.items.find(item => item.id === parseInt(id, 10));
    return video || null;
  } catch (error) {
    console.error('Erro ao buscar vídeo por ID:', error);
    throw error;
  }
};