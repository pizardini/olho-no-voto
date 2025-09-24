import { useEffect, useState } from "react";
import { fetchProposicao } from "../services/api";
import type { ProposicaoDetalhesData } from "../types";

export function useProposicaoDetalhes(idProposicao: string) {
  const [detalhes, setDetalhes] = useState<ProposicaoDetalhesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProposicao(idProposicao)
      .then((data) => setDetalhes(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [idProposicao]);

  return { detalhes, loading, error };
}