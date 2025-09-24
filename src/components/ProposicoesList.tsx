import { useState } from "react";
import { useProposicoes } from "../hooks/useProposicoes";
import { useNavigate } from "react-router";

function ProposicoesList() {
  const [id, setId] = useState("");
  const [ano, setAno] = useState("");
  const [siglaTipo, setSiglaTipo] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const navigate = useNavigate();
  const [ordenarPor, setOrdenarPor] = useState<"id" | "codTipo" | "siglaTipo" | "numero" | "ano">("numero");
  const [ordem, setOrdem] = useState<"asc" | "desc">("desc");

  const [appliedFilters, setAppliedFilters] = useState<{
    idProposicao?: string;
    ano?: number;
    siglaTipo?: string;
    dataApresentacaoInicio?: string;
    dataApresentacaoFim?: string;
    ordenarPor?: string;
    ordem?: "asc" | "desc";
  } | undefined>(undefined);

const { proposicoes, loading, error } = useProposicoes(appliedFilters);

  const handleBuscar = () => {
    setAppliedFilters({
      idProposicao: id || undefined,
      ano: ano ? Number(ano) : undefined,
      siglaTipo: siglaTipo || undefined,
      dataApresentacaoInicio: dataInicio || undefined,
      dataApresentacaoFim: dataFim || undefined,
      ordenarPor,
      ordem
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
        <div className="flex flex-wrap gap-2 justify-center">
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="border px-2 py-1 rounded flex-1 min-w-[150px] max-w-[210px]"
          />
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="border px-2 py-1 rounded flex-1 min-w-[150px] max-w-[210px]"
          />
        </div>

        {/* Ordenação */}
        <div className="flex flex-wrap gap-2 items-center">
          <label>
            Ordenar por:{" "}
            <select
              value={ordenarPor}
              onChange={(e) => setOrdenarPor(e.target.value as any)}
              className="border px-2 py-1 rounded"
            >
              <option className="text-gray-900" value="id">ID</option>
              <option className="text-gray-900" value="codTipo">codTipo</option>
              <option className="text-gray-900" value="siglaTipo">siglaTipo</option>
              <option className="text-gray-900" value="numero">Número</option>
              <option className="text-gray-900" value="ano">Ano</option>
            </select>
          </label>

          <label>
            Ordem:{" "}
            <select
              value={ordem}
              onChange={(e) => setOrdem(e.target.value as "asc" | "desc")}
              className="border px-2 py-1 rounded"
            >
              <option className="text-gray-900" value="asc">Ascendente</option>
              <option className="text-gray-900" value="desc">Descendente</option>
            </select>
          </label>
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
            <li key={p.id}>
              <button
                onClick={() => navigate(`/proposicoes/${p.id}`)}
                className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
              >
              <p className="font-semibold">
                {p.siglaTipo} {p.numero}/{p.ano}
              </p>
              <p className="text-sm text-gray-400">
                {p.ementa || "Sem ementa"}
              </p>
              </button>
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
