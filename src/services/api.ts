// src/services/api.ts
import type { Deputado, Voto, Votacao } from "../types";

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

export async function fetchVotacoes(params?: {
  idProposicao?: string;
  dataInicio?: string;
  dataFim?: string;
  pagina?: number;
  itens?: number;
}): Promise<Votacao[]> {
  const query = new URLSearchParams({
    ordem: "DESC",
    ordenarPor: "dataHoraRegistro",
  });

  if (params?.idProposicao) query.append("idProposicao", params.idProposicao);
  if (params?.dataInicio) query.append("dataInicio", params.dataInicio);
  if (params?.dataFim) query.append("dataFim", params.dataFim);
  if (params?.pagina) query.append("pagina", params.pagina.toString());
  if (params?.itens) query.append("itens", params.itens.toString());

  const res = await fetch(
    `https://dadosabertos.camara.leg.br/api/v2/votacoes?${query.toString()}`
  );
  if (!res.ok) throw new Error("Erro ao buscar votações");

  const data = await res.json();
  return data.dados.map((v: any) => ({
    id: v.id,
    data: v.data,
    hora: v.hora,
    descricao: v.descricao,
  }));
}

