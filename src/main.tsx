import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- 1. Import the Router wrapper
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Wrap App here so EVERY component inside it has access to routing and links */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);