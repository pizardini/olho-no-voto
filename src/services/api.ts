// src/services/api.ts
import type { Deputado, Voto } from "../types";

export async function fetchDeputados(): Promise<Deputado[]> {
  const res = await fetch(
    "https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome"
  );
  if (!res.ok) throw new Error("Erro ao buscar deputados");
  const data = await res.json();
  return data.dados;
}

// Novo: buscar votos de uma votação específica
export async function fetchVotos(idVotacao: string): Promise<Voto[]> {
  const res = await fetch(
    `https://dadosabertos.camara.leg.br/api/v2/votacoes/${idVotacao}/votos`
  );
  if (!res.ok) throw new Error("Erro ao buscar votos");
  const data = await res.json();
  return data.dados;
}
