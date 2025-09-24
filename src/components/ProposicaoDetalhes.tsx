import { useParams } from "react-router";
import { useProposicaoDetalhes } from "../hooks/useProposicaoDetalhe";
import infosJson from "../data/infos.json";

const infos: Record<string, { resumo: string }> = infosJson;

export default function ProposicaoDetalhes() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>ID inválido</p>;
  }

  const { detalhes, loading, error } = useProposicaoDetalhes(id);

  if (loading) {
    return <p className="text-gray-600">Carregando proposição...</p>;
  }

  if (error) {
    return <p className="text-red-600">Erro: {error}</p>;
  }

  if (!detalhes) {
    return <p className="text-gray-600">Nenhuma proposição encontrada.</p>;
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md space-y-6">
      {/* Cabeçalho da proposição */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {detalhes.siglaTipo} {detalhes.numero}/{detalhes.ano}
        </h2>
        {infos[detalhes.id] && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {infos[detalhes.id].resumo}
          </p>
        )}
        <p className="text-gray-700">{detalhes.ementa || "Sem ementa"}</p>
        <p className="text-gray-700">{detalhes.ementa || "Sem ementa"}</p>
        {detalhes.urlInteiroTeor && (
          <a
            href={detalhes.urlInteiroTeor}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Inteiro teor
          </a>
        )}
      </div>

      {/* Detalhes adicionais */}
      <div className="space-y-2 text-sm text-gray-600">
        <p>Tipo: {detalhes.codTipo}</p>
        <p>Número: {detalhes.numero}</p>
        <p>Ano: {detalhes.ano}</p>
      </div>
    </div>
  );
}
