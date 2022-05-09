import './style/style.scss';

import App from './components/app/App';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import MarvelService from './services/MarvelService';
import React from 'react';
import ReactDOM from 'react-dom';

const marvelService = new MarvelService();

marvelService.getCharacter(1011052).then((res) => console.log(res));

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

