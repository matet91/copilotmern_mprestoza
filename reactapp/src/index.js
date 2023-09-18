import React from 'react';
import ReactDOM from 'react-dom/client';
import './dist/app.css';
import App from './App';
//import react router dom
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
//render a browser router with nested routes
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
