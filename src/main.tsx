import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App';
import RootLayout from './layouts/RootLayout';
import './index.css';
import Votacoes from './components/Projetos';
import Deputados from './components/Deputados';
import ComoUsar from './components/ComoUsar';
import Proposicoes from './components/ProposicoesList';
import ProposicaoDetalhes from './components/ProposicaoDetalhes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/olho-no-voto">
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<App />} />
          <Route path="votacoes" element={<Votacoes />} />
          <Route path="deputados" element={<Deputados />} />
          <Route path="como-usar" element={<ComoUsar />} />
          <Route path="proposicoes" element={<Proposicoes />} />
          <Route path="/proposicoes/:id" element={<ProposicaoDetalhes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
