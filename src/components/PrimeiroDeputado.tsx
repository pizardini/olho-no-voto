import type { Deputado } from "../types";
import { useDeputados } from "../hooks/useDeputados";

export default function PrimeiroDeputado() {
  const { deputados, loading, error } = useDeputados();
  const primeiroDeputado: Deputado | undefined = deputados[0];

  // Salvar o ID no localStorage apenas uma vez
  if (primeiroDeputado && !localStorage.getItem("primeiroDeputado")) {
    localStorage.setItem("primeiroDeputado", String(primeiroDeputado.id));
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!primeiroDeputado) return <p>Nenhum deputado encontrado</p>;

  return <pre>{JSON.stringify(primeiroDeputado, null, 2)}</pre>;
}
