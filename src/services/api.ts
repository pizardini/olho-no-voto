import type { Deputado, Voto, Votacao, VotacaoDetalhesData, ProposicaoDetalhesData } from "../types";


export async function fetchDeputados(): Promise<Deputado[]> {
  const res = await fetch(
    "https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome"
  );
  if (!res.ok) throw new Error("Erro ao buscar deputados");
  const data = await res.json();
  return data.dados;
}

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

export async function fetchVotacaoDetalhes(idVotacao: string): Promise<VotacaoDetalhesData> {
  const res = await fetch(`https://dadosabertos.camara.leg.br/api/v2/votacoes/${idVotacao}`);
  if (!res.ok) {
    throw new Error("Erro ao buscar detalhes da votação");
  }
  const data = await res.json();
  return data.dados;
}

export async function fetchProposicao(idProposicao: string): Promise<ProposicaoDetalhesData> {
  const res = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes/${idProposicao}`);
  if (!res.ok) {
    throw new Error("Erro ao buscar detalhes da proposição");
  }
  const data = await res.json();
  return data.dados;
}

export async function fetchProposicoesList(filters?: {
  idProposicao?: string;
  ano?: number;
  siglaTipo?: string;
  dataApresentacaoInicio?: string;
  dataApresentacaoFim?: string;
  idAutor?: number;
  autor?: string;
  ordenarPor?: string;
  ordem?: "asc" | "desc";
}) {
  const baseUrl  = 'https://dadosabertos.camara.leg.br/api/v2/proposicoes';
  const params = new URLSearchParams();
  if (filters) {
    if (filters.idProposicao) params.append("id", filters.idProposicao);
    if (filters.ano !== undefined && filters.ano !== null) params.append("ano", String(filters.ano));
    if (filters.siglaTipo) params.append("siglaTipo", filters.siglaTipo);
    if (filters.dataApresentacaoInicio) params.append("dataApresentacaoInicio", filters.dataApresentacaoInicio);
    if (filters.dataApresentacaoFim) params.append("dataApresentacaoFim", filters.dataApresentacaoFim);
    if (filters.idAutor !== undefined && filters.idAutor !== null) params.append("idAutor", String(filters.idAutor));
    if (filters.autor) params.append("autor", filters.autor);
    if (filters.ordenarPor) params.append("ordenarPor", filters.ordenarPor);
    if (filters.ordem) params.append("ordem", filters.ordem);
  }
  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl + '?ano=2025&ordem=desc&ordenarPor=numero';
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Erro ao buscar proposições (status ${res.status}) ${txt}`);
  }
  const data = await res.json();
  return data.dados;
}

export async function fetchInteiroTeor(url: string): Promise<ProposicaoDetalhesData> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Erro ao buscar inteiro teor da proposição");
  }
  const data = await res.json();
  return data.dados;
}
