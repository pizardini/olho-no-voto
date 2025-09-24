import { useParams } from "react-router";

export default function ProposicaoDetalhes() {
    const { id } = useParams<{ id: string }>();
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Página de Proposição</h2>
      <p className="mt-2 text-gray-600">
        Aqui será exibido o conteúdo de Proposição futuramente. ID da Proposição: {id}
      </p>
    </div>
  );
}
