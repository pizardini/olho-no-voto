import { useEffect, useState } from "react";
import { fetchVotacaoDetalhes } from "../services/api";
import type { VotacaoDetalhesData } from "../types";

export function useVotacaoDetalhes(idVotacao: string) {
  const [detalhes, setDetalhes] = useState<VotacaoDetalhesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVotacaoDetalhes(idVotacao)
      .then((data) => setDetalhes(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [idVotacao]);

  return { detalhes, loading, error };
}
