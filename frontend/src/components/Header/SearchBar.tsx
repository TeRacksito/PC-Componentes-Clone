import { Category, Product } from "@pcc/shared";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { searchByName } from "../../services/searchService";
import { debounce } from "../../utils/debounce";
import { LoadingCircle } from "../Loading/LoadingCircle";
import { Overlay } from "./Overlay";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<Product[] | Category[]>([]);

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      searchByName(searchTerm).then((data) => {
        setMatches(data);
        setLoading(false);
      });
    }, 500),
    [],
  );

  const handleSearch = (query: string) => {
    if (query.length === 0) {
      debouncedSearch.cancel();
      setIsOpen(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    debouncedSearch(query);

    setIsOpen(true);
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div
        className={
          "relative flex-grow sm:flex items-center space-x-2 " +
          (isOpen ? "z-50" : "")
        }
      >
        <input
          type="text"
          placeholder="Buscar..."
          className="bg-white w-full px-3 py-2 text-black rounded-md"
          onFocus={(e) => handleSearch(e.target.value)}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div
          className={`fixed right-0 left-0 lg:absolute md:-right-5 md:-left-5 -top-5 h-100 flex items-center bg-white rounded-md transition-all -z-1 ${
            isOpen ? "translate-y-0" : "translate-y-[-100%]"
          } ${isOpen ? "visible" : "invisible"}`}
        >
          {loading ? (
            <LoadingCircle />
          ) : (
            isOpen && (
              <div className="w-full max-w-3xl mx-auto p-2">
                {matches.length === 0 ? (
                  <p className="text-gray-500 text-center">
                    No se encontraron resultados
                  </p>
                ) : (
                  <ul>
                    {matches.map((match) => (
                      <li
                        className="hover:bg-gray-100 px-2 py-1 rounded text-wrap"
                        key={match.id}
                      >
                        <Link
                          className="w-full block h-full"
                          to={`/${match.id}`}
                          onClick={() => handleSearch("")}
                        >
                          {match.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
