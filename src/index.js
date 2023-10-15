import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ChurchUserProvider } from './contexts/churchUserContext';
import { ChurchProvider } from './contexts/churchContext';
import { EventProvider } from './contexts/eventContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EventProvider>
      <ChurchUserProvider>
        <ChurchProvider>
          <App />
        </ChurchProvider>
      </ChurchUserProvider>
    </EventProvider>
  </React.StrictMode>
);
