import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-200 shadow">
      <Link to="/" className="hover:underline">Início</Link>
      <Link to="/projetos" className="hover:underline">Projetos</Link>
      <Link to="/deputados" className="hover:underline">Deputados</Link>
    </nav>
  );
}

export default Navbar;