import { useState } from "react";
import VotacaoDetalhes from "./VotacaoDetalhes";

interface VotacaoItem {
  id: string;
  titulo: string;
}

const votacoes: VotacaoItem[] = [
  { id: "2270800-160", titulo: "PEC da Blindagem" },
  { id: "2562149-7", titulo: "Urgência da Anistia sobre atos de 08/01/2022" },
  
];

export default function VotacoesList() {
  const [selecionada, setSelecionada] = useState<string | null>(null);

  if (selecionada) {
    return (
      <div>
        <button onClick={() => setSelecionada(null)}>Voltar</button>
        <VotacaoDetalhes idVotacao={selecionada} />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Votações em destaque:</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {votacoes.map((v) => (
          <li key={v.id}>
            <button
              onClick={() => setSelecionada(v.id)}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
            >
              {v.titulo}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
