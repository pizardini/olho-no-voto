import { useVotacao } from "../hooks/useVotacao";

interface Props {
  idVotacao: string;
}

export default function VotacaoDetalhes({ idVotacao }: Props) {
  const { votos, loading, error } = useVotacao(idVotacao);

  if (loading) return <p>Carregando votos...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!votos.length) return <p>Nenhum voto encontrado</p>;

  return (
    <div>
      <h3>Votos da votação {idVotacao}</h3>
      <ul>
        {votos.map((v) => (
          <li key={v.deputado_.id}>
            {v.deputado_.nome} ({v.deputado_.siglaPartido}-{v.deputado_.siglaUf}) →{" "}
            {v.tipoVoto}
          </li>
        ))}
      </ul>
    </div>
  );
}
