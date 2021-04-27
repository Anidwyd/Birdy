import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import MainPage from './components/MainPage';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
