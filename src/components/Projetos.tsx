import { useState } from "react";
import { useVotacoes } from "../hooks/useVotacoes";

function Projetos() {
  const [idProposicao, setIdProposicao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [aplicar, setAplicar] = useState(false);
  // const [id, setId] = useState("");
  // const [idEvento, setIdEvento] = useState("");
  // const [idOrgao, setIdOrgao] = useState("");

  const { votacoes, loading, error } = useVotacoes(
    aplicar
      ? { idProposicao, dataInicio, dataFim }
      : undefined // carrega últimas votações por padrão
  );

return (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Buscar Votações</h2>

    <div className="space-y-4 mb-4">
      {/* Primeira linha: ids */}
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="id"
          className="border px-2 py-1 rounded flex-1 min-w-[150px]"
        />
        <input
          type="text"
          placeholder="idEvento"
          className="border px-2 py-1 rounded flex-1 min-w-[150px]"
        />
        <input
          type="text"
          placeholder="idOrgao"
          className="border px-2 py-1 rounded flex-1 min-w-[150px]"
        />
        <input
          type="text"
          placeholder="idProposicao"
          value={idProposicao}
          onChange={(e) => setIdProposicao(e.target.value)}
          className="border px-2 py-1 rounded flex-1 min-w-[150px]"
        />
      </div>

      {/* Segunda linha: datas e selects */}
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

        <select className="border px-2 py-1 rounded flex-1 min-w-[150px]">
          <option className="text-gray-800" value="ASC">ASC</option>
          <option className="text-gray-800" value="DESC">DESC</option>
        </select>

        <select className="border px-2 py-1 rounded flex-1 min-w-[150px]">
          <option className="text-gray-800" value="id">id</option>
          <option className="text-gray-800" value="idEvento">idEvento</option>
          <option className="text-gray-800" value="idOrgao">idOrgao</option>
          <option className="text-gray-800" value="idProposicao">idProposicao</option>
        </select>
      </div>

      {/* Botão */}
      {/* <div>
        <button disabled={loading}
          // onClick={() => setAplicar(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          // className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div> */}
      <button disabled>Busca ainda não implementada</button>
    </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <ul className="space-y-2">
        {/* {votacoes.map((v) => (
          <li key={v.id} className="border p-2 rounded">
            <p className="font-semibold">{v.descricao || "Sem descrição"}</p>
            <p className="text-sm text-gray-600">
              {v.data} e {v.id}
            </p>
          </li>
        ))} */}
        {votacoes?.[0] ? (
          <li key={votacoes[0].id} className="border p-2 rounded">
            <p className="font-semibold">{votacoes[0].descricao || "Sem descrição"}</p>
            <p className="text-sm text-gray-600">
              {votacoes[0].data} e {votacoes[0].id}
            </p>
          </li>
        ) : (
          <p>Nenhuma votação encontrada.</p>
        )}
      </ul>
    </div>
  );
}

export default Projetos;
