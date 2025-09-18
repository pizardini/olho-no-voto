import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App';
import RootLayout from './layouts/RootLayout';
import './index.css';
import Projetos from './components/Projetos';
import Deputados from './components/Deputados';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/olho-no-voto">
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<App />} />
          <Route path="projetos" element={<Projetos />} />
          <Route path="deputados" element={<Deputados />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
