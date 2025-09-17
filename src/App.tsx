import PrimeiroDeputado from "./components/PrimeiroDeputado";
import VotacoesList from "./components/VotacoesList";

function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Olho no Voto</h1>
      <VotacoesList />
    </div>
  );
}

export default App;
