import { useEffect, useState } from "react";
import { fetchVotos } from "../services/api";
import type { Voto } from "../types";

export function useVotacao(idVotacao: string) {
  const [votos, setVotos] = useState<Voto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVotos(idVotacao)
      .then((data) => setVotos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [idVotacao]);

  return { votos, loading, error };
}
