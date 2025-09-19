import { useVotacao } from "../hooks/useVotacao";
import { useVotacaoDetalhes } from "../hooks/useVotacaoDetalhes";

interface Props {
  idVotacao: string;
}

export default function VotacaoDetalhes({ idVotacao }: Props) {
  const { votos, loading: votosLoading, error: votosError } = useVotacao(idVotacao);
  const { detalhes, loading: detalhesLoading, error: detalhesError } = useVotacaoDetalhes(idVotacao);

  if (votosLoading || detalhesLoading) {
    return <p className="text-gray-600">Carregando informações...</p>;
  }

  if (votosError || detalhesError) {
    return <p className="text-red-600">Erro: {votosError || detalhesError}</p>;
  }

  if (!detalhes) {
    return <p className="text-gray-600">Nenhum detalhe encontrado.</p>;
  }

  // Agrupar votos por UF
  const votosPorUf = votos.reduce((acc: Record<string, typeof votos>, v) => {
    const uf = v.deputado_.siglaUf;
    if (!acc[uf]) acc[uf] = [];
    acc[uf].push(v);
    return acc;
  }, {});

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md space-y-6">
      {/* Cabeçalho da votação */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Votação {detalhes.id}
        </h2>
        <p className="text-gray-600 mb-1">{detalhes.descricao}</p>
        <p className="text-sm text-gray-500">
          Data: {new Date(detalhes.dataHoraRegistro).toLocaleString("pt-BR")}
        </p>
        <p className="text-sm text-gray-500">Órgão: {detalhes.siglaOrgao}</p>
        {detalhes.objetosPossiveis.length > 0 && (
          <p className="text-sm text-gray-700 mt-2">
            Proposição:{" "}
            <a
              href={detalhes.objetosPossiveis[0].uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {detalhes.objetosPossiveis[0].siglaTipo}{" "}
              {detalhes.objetosPossiveis[0].numero}/
              {detalhes.objetosPossiveis[0].ano}
            </a>
          </p>
        )}
      </div>

      {/* Lista de votos agrupados */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Votos por Estado
        </h3>
        {Object.entries(votosPorUf).map(([uf, votosUF]) => (
          <div key={uf} className="mb-6">
            <h4 className="font-bold text-lg text-gray-700 mb-2">
              {uf} ({votosUF.length} votos)
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {votosUF.map((v) => (
                <li
                  key={v.deputado_.id}
                  className="p-3 bg-gray-50 rounded-lg shadow-sm border text-sm"
                >
                  <span className="font-medium">{v.deputado_.nome}</span>{" "}
                  <span className="text-gray-600">
                    ({v.deputado_.siglaPartido})
                  </span>
                  <div className="mt-1">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        v.tipoVoto === "Sim"
                          ? "bg-green-100 text-green-800"
                          : v.tipoVoto === "Não"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {v.tipoVoto}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
