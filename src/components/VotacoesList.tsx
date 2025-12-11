import { useNavigate } from "react-router";

interface VotacaoItem {
  id: string;
  titulo: string;
}

const votacoes: VotacaoItem[] = [
  { id: "2270800-160", titulo: "PEC da Blindagem" },
  { id: "2562149-7", titulo: "Urgência da Anistia sobre atos de 08/01/2022" },
  { id: "2525180-26", titulo: "Retirada da MPV 1303/25 da pauta da votação"},
  { id: "2570007-63", titulo: "Proibição de cobrança de bagagem de mão e obrigatoriedade de 1 bagagem despachada gratuita"},
  { id: "2358548-98", titulo: "Reduz a pena dos criminoso." },
  { id: "2525122-81", titulo: "Cassação de Carla Zambelli." },
  
];

export default function VotacoesList() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Votações em destaque:</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {votacoes.map((v) => (
          <li key={v.id}>
            <button
              onClick={() => navigate(`/votacoes/${v.id}`)}
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
