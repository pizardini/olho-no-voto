import { useState } from "react";
import { useVotacao } from "../hooks/useVotacao";
import { useVotacaoDetalhes } from "../hooks/useVotacaoDetalhes";

interface Props {
  idVotacao: string;
}

export default function VotacaoDetalhes({ idVotacao }: Props) {
  const { votos, loading: votosLoading, error: votosError } = useVotacao(idVotacao);
  const { detalhes, loading: detalhesLoading, error: detalhesError } = useVotacaoDetalhes(idVotacao);

  const [expandedUF, setExpandedUF] = useState<string | null>(null);

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

  // Ordenar estados por quantidade de votos (decrescente)
  const ufsOrdenadas = Object.entries(votosPorUf).sort(
    (a, b) => b[1].length - a[1].length
  );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md space-y-6">
      {/* Cabeçalho da votação */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Votação {detalhes.id}
        </h2>
        <p className="text-gray-700 mb-1">{detalhes.descricao}</p>
        <p className="text-sm text-gray-600">
          Data: {new Date(detalhes.dataHoraRegistro).toLocaleString("pt-BR")}
        </p>
        <p className="text-sm text-gray-600">Órgão: {detalhes.siglaOrgao}</p>
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
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Votos por Estado
        </h3>
        {ufsOrdenadas.map(([uf, votosUF]) => {
          const isOpen = expandedUF === uf;
          return (
            <div key={uf} className="mb-4 border rounded-lg bg-gray-50">
              <button
                onClick={() => setExpandedUF(isOpen ? null : uf)}
                className="w-full flex justify-between items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-t-lg text-left"
              >
                <span className="font-bold text-gray-100">
                  {uf} ({votosUF.length} votos)
                </span>
                <span className="text-gray-700">{isOpen ? "▲" : "▼"}</span>
              </button>
              {isOpen && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
                  {votosUF.map((v) => (
                    <li
                      key={v.deputado_.id}
                      className="p-3 bg-white rounded-lg shadow-sm border text-sm text-gray-900"
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
