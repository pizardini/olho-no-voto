import VotacoesList from "./components/VotacoesList";

function App() {
  return (
    <div className="p-4 sm:p-8 md:p-12 font-sans">
      <h1 className="text-lg sm:text-xl md:text-2xl text-center">Olho no Voto</h1>
        <div className="mt-4 text-sm sm:text-base md:text-lg">
        <VotacoesList />
        </div>
    </div>
  )
}

export default App;