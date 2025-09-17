import { useState } from "react";
import VotacaoDetalhes from "./VotacaoDetalhes";

interface VotacaoItem {
  id: string;
  titulo: string;
}

const votacoes: VotacaoItem[] = [
  { id: "2270800-160", titulo: "PEC da Blindagem" },
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
      <h2>Votações disponíveis:</h2>
      <ul>
        {votacoes.map((v) => (
          <li key={v.id}>
            <button onClick={() => setSelecionada(v.id)}>{v.titulo}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
