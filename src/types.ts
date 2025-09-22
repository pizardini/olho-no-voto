export interface Deputado {
  id: number;
  uri: string;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  idLegislatura: number;
  urlFoto: string;
  email: string;
}
// export interface ApiDeputadoResponse {
//   dados: Deputado[];
//   links: any[];
// }

export interface Voto {
  tipoVoto: string;
  dataRegistroVoto: string;
  deputado_: Deputado;
}

// export interface ApiVotacaoResponse {
//   dados: Voto[];
//   links: any[];
// }

export interface Votacao {
  id: string;
  data: string;
  hora: string;
  descricao: string | null;
}

export interface VotacaoDetalhesData {
  aprovacao: number;
  data: string;
  dataHoraRegistro: string;
  descricao: string;
  // efeitosRegistrados: EfeitoRegistrado[];
  id: string;
  idEvento: number;
  idOrgao: number;
  objetosPossiveis: ObjetoPossivel[];
  // proposicoesAfetadas: ProposicaoAfetada[];
  siglaOrgao: string;
  ultimaApresentacaoProposicao: UltimaApresentacao | null;
  uri: string;
  uriEvento: string;
  uriOrgao: string;
}
// export interface ProposicaoAfetada extends ObjetoPossivel {}

export interface UltimaApresentacao {
  dataHoraRegistro: string;
  descricao: string;
  uriProposicaoCitada: string;
}

// export interface EfeitoRegistrado {
//   dataHoraResultado: string;
//   descResultado: string;
//   tituloProposicao: string;
//   uriProposicao: string;
// }

export interface ObjetoPossivel {
  ano: number;
  codTipo: number;
  ementa: string;
  id: number;
  numero: number;
  siglaTipo: string;
  uri: string;
}

export interface ProposicaoDetalhesData {
  id: number;
  urlInteiroTeor: string;
}
