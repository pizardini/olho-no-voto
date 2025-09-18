import { useEffect, useState } from "react";
import { fetchVotacoes } from "../services/api";
import type { Votacao } from "../types";

export function useVotacoes(filters?: {
  idProposicao?: string;
  dataInicio?: string;
  dataFim?: string;
}) {
  const [votacoes, setVotacoes] = useState<Votacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchVotacoes(filters)
      .then((data) => setVotacoes(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [filters?.idProposicao, filters?.dataInicio, filters?.dataFim]);

  return { votacoes, loading, error };
}
