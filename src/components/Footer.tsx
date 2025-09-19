import { useState } from "react";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText("99f6fbdb-c3f7-4ed0-b8f5-77defa1b1213");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <footer className="w-full bg-gray-800/50 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-50 py-3 text-sm text-gray-200">
        <span className="font-medium">Desenvolvido por Pietro Zardini</span>

        <a
        href="https://github.com/pizardini"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 sm:mt-0 hover:text-white transition-colors"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.579 0-.287-.011-1.244-.017-2.444-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.931 0-1.31.468-2.381 1.236-3.222-.124-.303-.536-1.527.117-3.176 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 0 1 3-.404c1.018.005 2.043.138 3 .404 2.289-1.552 3.295-1.23 3.295-1.23.655 1.649.243 2.873.12 3.176.77.841 1.235 1.912 1.235 3.222 0 4.61-2.807 5.623-5.479 5.921.43.371.813 1.102.813 2.222 0 1.604-.015 2.896-.015 3.286 0 .321.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
        </a>

        <a
        href="https://br.linkedin.com/in/pietrozardini"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 sm:mt-0 hover:text-white transition-colors"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.866-3.063-1.868 0-2.155 1.459-2.155 2.966v5.701h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.562 2.839-1.562 3.036 0 3.598 2 3.598 4.594v5.601z"/>
        </svg>
        </a>

        <div className="relative mt-2 sm:mt-0">
          <button
            onClick={handleCopyPix}
            className="hover:text-green-400 transition-colors"
          >
            Me faz um pix
          </button>

          {copied && (
            <div className="absolute bottom-full transform -translate-x-1/2 -mb-1 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 animate-fadeIn">
              Chave pix copiada!
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
