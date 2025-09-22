import { useState } from "react";
import { useProposicoes } from "../hooks/useProposicoes";

function ProposicoesList() {
  const [id, setId] = useState("");
  const [ano, setAno] = useState("");
  const [siglaTipo, setSiglaTipo] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const [appliedFilters, setAppliedFilters] = useState<{
    idProposicao?: string;
    ano?: number;
    siglaTipo?: string;
    dataApresentacaoInicio?: string;
    dataApresentacaoFim?: string;
  } | undefined>(undefined);

const { proposicoes, loading, error } = useProposicoes(appliedFilters);

  const handleBuscar = () => {
    setAppliedFilters({
      idProposicao: id || undefined,
      ano: ano ? Number(ano) : undefined,
      siglaTipo: siglaTipo || undefined,
      dataApresentacaoInicio: dataInicio || undefined,
      dataApresentacaoFim: dataFim || undefined,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Buscar Proposições</h2>

      <div className="space-y-4 mb-4">
        {/* Primeira linha */}
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border px-2 py-1 rounded flex-1 min-w-[150px]"
          />
          <input
            type="text"
            placeholder="ano"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            className="border px-2 py-1 rounded flex-1 min-w-[150px]"
          />
          <input
            type="text"
            placeholder="siglaTipo (ex: PL, PEC)"
            value={siglaTipo}
            onChange={(e) => setSiglaTipo(e.target.value)}
            className="border px-2 py-1 rounded flex-1 min-w-[150px]"
          />
        </div>

        {/* Segunda linha */}
        <div className="flex flex-wrap gap-2">
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="border px-2 py-1 rounded flex-1 min-w-[150px]"
          />
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="border px-2 py-1 rounded flex-1 min-w-[150px]"
          />
        </div>

        {/* Botão */}
        <div>
          <button
            disabled={loading}
            onClick={handleBuscar}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Buscar
          </button>
        </div>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <ul className="space-y-2">
        {proposicoes?.length ? (
          proposicoes.map((p) => (
            <li key={p.id} className="border p-2 rounded">
              <p className="font-semibold">
                {p.siglaTipo} {p.numero}/{p.ano}
              </p>
              <p className="text-sm text-gray-600">
                {p.ementa || "Sem ementa"}
              </p>
            </li>
          ))
        ) : (
          !loading && <p>Nenhuma proposição encontrada.</p>
        )}
      </ul>
    </div>
  );
}

export default ProposicoesList;
