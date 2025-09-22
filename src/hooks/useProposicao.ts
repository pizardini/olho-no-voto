import { useEffect, useState } from "react";
import { fetchInteiroTeor } from "../services/api";
import type { ProposicaoDetalhesData } from "../types";

export function useProposicaoDetalhes(url: string) {
  const [detalhesP, setDetalhesP] = useState<ProposicaoDetalhesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    setError(null);

    fetchInteiroTeor(url)
      .then((data) => setDetalhesP(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { detalhesP, loading, error };
}
