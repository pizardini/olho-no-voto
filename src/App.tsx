import VotacoesList from "./components/VotacoesList";

export default function App() {
  return (
    <div className="font-sans">
      <div className="p-4 sm:p-8 md:p-12 text-center">
        <h1 className="text-lg sm:text-xl md:text-2xl">Olho no Voto</h1>
        <div className="mt-4 text-sm sm:text-base md:text-lg">
          <VotacoesList />
        </div>
      </div>
    </div>
  );
}
