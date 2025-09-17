import { useEffect, useState } from "react";
import { fetchDeputados } from "../services/api";
import type { Deputado } from "../types";

export function useDeputados() {
  const [deputados, setDeputados] = useState<Deputado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDeputados()
      .then((data) => setDeputados(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { deputados, loading, error };
}
