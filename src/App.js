// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { authenticate } from './services/api';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const success = await authenticate();
        setIsAuthenticated(success);
        setAuthError(!success);
      } catch (error) {
        console.error('Erro na autenticação inicial:', error);
        setAuthError(true);
      }
    };

    initAuth();
  }, []);

  if (authError) {
    return <div className="auth-error">Falha na autenticação com o servidor.</div>;
  }

  if (!isAuthenticated) {
    return <div className="loading-container">Autenticando...</div>;
  }

  return (
    <BrowserRouter future={{ 
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/video/:id" element={<VideoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;