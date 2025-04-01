import axios from 'axios';

// Configure a URL base e a chave de API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/v1';

// Cria uma instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true // Importante: isso permite que o axios envie cookies
});

let isAuthenticating = false;

export const authenticate = async () => {
  try {
    isAuthenticating = true;
    
    const password = process.env.REACT_APP_FRONTEND_ACCESS_PASSWORD || 'senha_conhecida';
    const response = await api.post('/auth/session', { password });
    
    isAuthenticating = false;
    return response.status === 200;
  } catch (error) {
    isAuthenticating = false;
    console.error('Erro na autenticação:', error);
    return false;
  }
};

api.interceptors.response.use(
  response => response,
  async error => {
    // Não retente se já estamos tentando autenticar ou se o erro veio da rota de autenticação
    const isAuthEndpoint = error.config.url.includes('/auth/session');
    
    if (error.response && error.response.status === 401 && !isAuthenticating && !isAuthEndpoint) {
      // Apenas tente autenticar uma vez por ciclo de erro
      const authSuccess = await authenticate();
      if (authSuccess) {
        // Repetir a requisição original apenas se a autenticação teve sucesso
        return api(error.config);
      }
    }
    return Promise.reject(error);
  }
);

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