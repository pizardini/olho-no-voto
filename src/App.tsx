import { useEffect, useState } from "react";

// Tipo para os dados que a API retorna
interface Deputado {
  id: number;
  uri: string;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  idLegislatura: number;
  urlFoto: string;
  email: string;
}

// Estrutura da resposta da API
interface ApiResponse {
  dados: Deputado[];
  links: any[];
}

function App() {
  const [primeiroDeputado, setPrimeiroDeputado] = useState<Deputado | null>(null);

  useEffect(() => {
    const salvo = localStorage.getItem("primeiroDeputado");

    fetch("https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome")
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        if (data.dados && data.dados.length > 0) {
          const primeiro = data.dados[0];
          setPrimeiroDeputado(primeiro);
          // Salva apenas o id no localStorage
          if (!salvo) {
            localStorage.setItem("primeiroDeputado", String(primeiro.id));
          }
        }
      })
      .catch((err) => console.error("Erro ao buscar API:", err));
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Primeiro Deputado teste</h1>
      {primeiroDeputado ? (
        <pre>{JSON.stringify(primeiroDeputado, null, 2)}</pre>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default App;
