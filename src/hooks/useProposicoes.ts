import { useEffect, useState } from "react";
import { fetchProposicoesList } from "../services/api";
import type { ProposicaoDetalhesData } from "../types";

type Filters = {
  idProposicao?: string;
  ano?: number;
  siglaTipo?: string;
  dataApresentacaoInicio?: string;
  dataApresentacaoFim?: string;
  idAutor?: number;
  autor?: string;
};

export function useProposicoes(filters?: Filters) {
  const [proposicoes, setProposicoes] = useState<ProposicaoDetalhesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchProposicoesList(filters);
        if (!ignore) {
          setProposicoes(data);
        }
      } catch (err: any) {
        if (!ignore) {
          setError(err.message || "Erro ao carregar proposições");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
    // 👇 usamos JSON.stringify para não cair no loop infinito
  }, [JSON.stringify(filters)]);

  return { proposicoes, loading, error };
}
