interface Props {
  idProposicao: number;
}

export default function ProposicaoDetalhes({ idProposicao }: Props) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Página de Proposição</h2>
      <p className="mt-2 text-gray-600">
        Aqui será exibido o conteúdo de Proposição futuramente. ID da Proposição: {idProposicao}
      </p>
    </div>
  );
}
