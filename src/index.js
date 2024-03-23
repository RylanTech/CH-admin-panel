import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ChurchUserProvider } from './contexts/churchUserContext';
import { ChurchProvider } from './contexts/churchContext';
import { EventProvider } from './contexts/eventContext';
import { ArticleProvider } from './contexts/articleContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ArticleProvider>
      <EventProvider>
        <ChurchUserProvider>
          <ChurchProvider>
            <App />
          </ChurchProvider>
        </ChurchUserProvider>
      </EventProvider>
    </ArticleProvider>
  </React.StrictMode>
);
