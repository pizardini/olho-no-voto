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
export interface ApiDeputadoResponse {
  dados: Deputado[];
  links: any[];
}

export interface Voto {
  tipoVoto: string;
  dataRegistroVoto: string;
  deputado_: Deputado;
}

export interface ApiVotacaoResponse {
  dados: Voto[];
  links: any[];
}