# Frontend Video Viewer

Esta aplicação React permite visualizar e pesquisar vídeos da API Pexels, oferecendo uma interface moderna e responsiva para navegação, filtragem e reprodução de vídeos.

## Tecnologias Utilizadas

- React 19.0.0
- React Router 6.20.0
- Axios 1.8.4
- Jest e React Testing Library (testes)
- CSS puro para estilização
- API Backend Pexels ([via nosso backend personalizado](https://github.com/belarba/backend_fccn))

## Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn
- Git

## Configuração Inicial

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/frontend_fccn.git
cd frontend_fccn
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
REACT_APP_API_BASE_URL=endereço_do_servidor_do_backend
REACT_APP_API_KEY=sua_backend_api_key_definida
```

- `REACT_APP_API_BASE_URL`: URL base da API de backend
- `REACT_APP_API_KEY`: Chave de autenticação para o backend

## Executando o Projeto

### Ambiente de Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm start
# ou
yarn start
```

O aplicativo estará disponível em: http://localhost:3000 por padrão

### Build de Produção

Para gerar os arquivos de produção:

```bash
npm run build
# ou
yarn build
```

### Testes

Para executar todos os testes:

```bash
npm test
# ou
yarn test
```

Para executar testes com cobertura:

```bash
npm test -- --coverage
# ou
yarn test --coverage
```

## Estrutura do Projeto

O projeto segue uma arquitetura organizada com separação de responsabilidades:

- **src/components**: Componentes reutilizáveis da UI
  - **/Filters**: Componentes de filtros e modos de visualização
  - **/Header**: Cabeçalho da aplicação com busca
  - **/Pagination**: Navegação entre páginas
  - **/VideoDetail**: Reprodutor de vídeo e informações detalhadas
  - **/VideoList**: Componentes de listagem de vídeos
- **src/hooks**: Hooks personalizados React
  - `useVideos.js`: Gerenciamento de estado e busca de vídeos
  - `useVideoDetail.js`: Carregamento e manipulação de vídeos individuais
  - `useMediaQuery.js`: Detecção de viewport para responsividade
- **src/pages**: Componentes de páginas
  - `HomePage.jsx`: Página principal com listagem de vídeos
  - `VideoPage.jsx`: Página de detalhes do vídeo
- **src/services**: Serviços e utilitários
  - `api.js`: Funções para chamadas à API
- **src/__tests__**: Arquivos de testes

## Funcionalidades

### Página Principal (Home)

- Listagem de vídeos em grade (4 colunas) ou lista (1 coluna)
- Busca por palavras-chave
- Filtragem por resolução (HD, Full HD, 4K)
- Paginação para navegação entre resultados
- Layout responsivo para diferentes dispositivos

### Página de Vídeo

- Reprodução de vídeo com controles nativos
- Seleção de qualidade do vídeo (quando disponível)
- Exibição de metadados (autor, resolução, duração)
- Layout responsivo para diferentes dispositivos

## Integração com a API

A aplicação se comunica com a API de backend que fornece acesso aos vídeos do Pexels. As chamadas à API são gerenciadas pelo serviço `api.js` usando Axios.

### Endpoints Utilizados

- **GET /videos**: Busca vídeos com opções de filtragem e paginação
- **GET /videos/:id**: Obtém detalhes completos de um vídeo específico

Consulte o README do backend para mais detalhes sobre a API.

## Componentes e Hooks

### Componentes Principais

- **Header**: Navegação e busca
- **VideoList**: Exibição de vídeos em grade ou lista
- **VideoItem**: Card individual de vídeo
- **VideoDetail**: Player e detalhes do vídeo
- **Pagination**: Navegação entre páginas
- **FilterComponent**: Filtros de resolução
- **ViewModeFilter**: Alternância entre visualizações em grade e lista

### Hooks Personalizados

- **useVideos**: Gerencia o estado de busca, filtragem e paginação
- **useVideoDetail**: Carrega dados de vídeos individuais e gerencia seleção de qualidade
- **useMediaQuery**: Detecta o tamanho da tela para responsividade

## Testes

O projeto inclui testes para os principais componentes:

- Testes de renderização para verificar se os componentes são exibidos corretamente
- Testes de interação para verificar comportamentos de clique e navegação
- Testes de integração para verificar o funcionamento conjunto dos componentes

## Deployment

### Opções de Hospedagem

Os arquivos gerados pelo comando `build` podem ser hospedados em:

- Serviços de hospedagem estática (Netlify, Vercel, GitHub Pages)
- Servidores web tradicionais (Apache, Nginx)
- Contêineres Docker

### Procedimento de Deploy

1. Gere os arquivos de build:
   ```bash
   npm run build
   ```

2. Faça o upload dos arquivos da pasta `build` para o servidor de hospedagem

## Contribuindo

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/nome-da-feature`)
3. Commit suas alterações (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nome-da-feature`)
5. Crie um novo Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.
