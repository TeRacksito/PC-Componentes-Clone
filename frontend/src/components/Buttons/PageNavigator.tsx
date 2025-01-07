import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useOnClickOutside } from "../../hooks/onClickOutside";
import { LinkButton } from "./LinkButton";

interface PageNavigatorProps {
  currentPage: number;
  maxPages: number;
}

export const PageNavigator: React.FC<PageNavigatorProps> = ({
  currentPage,
  maxPages,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageInput, setPageInput] = useState<string>(currentPage.toString());
  const navigate = useNavigate();
  const location = useLocation();
  const popupRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(popupRef, () => setIsOpen(false)); // Close on outside click

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handleSubmit = () => {
    const pageNumber = parseInt(pageInput, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= maxPages) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("page", pageNumber.toString());
      navigate(`${location.pathname}?${searchParams.toString()}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 px-4 rounded-sm text-sm border border-gray-300 hover:border-white transition-colors"
      >
        Ir a página
      </button>
      {isOpen && (
        <div
          ref={popupRef}
          className="absolute bg-white p-4 shadow-lg border rounded w-40 flex flex-col gap-2"
          style={{
            top: -120,
            right: 0,
          }}
        >
          <p className="mb-2 text-sm text-center">Ir a la página...</p>
          <input
            type="number"
            value={pageInput}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-1 text-center"
            min={1}
            max={maxPages}
          />
          <LinkButton
            label="Ir"
            onClick={handleSubmit}
            className="p-2 px-4 rounded-sm text-sm border border-gray-300 hover:border-white transition-colors"
          />
        </div>
      )}
    </div>
  );
};
