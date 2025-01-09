import { useState } from "react";
import { FaBars, FaShoppingCart, FaTimes, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LateralMenu } from "./LateralMenu";

import PcLogo from "/pc-logo.svg";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md whitespace-nowrap">
      <div className="container mx-auto flex items-center justify-between py-4 px-6 gap-1">
        <Link to="/" className="flex items-center text-lg font-bold mx-1">
          <img src={PcLogo} alt="PC Clone Logo" className="h-8 mr-2" />
          <div className="hidden md:block">PC Clone</div>
        </Link>

        <button
          onClick={toggleMenu}
          className="hidden md:flex space-x-6 items-center justify-between px-4 py-2 rounded-sm hover:bg-gray-100 transition-colors duration-200 gap-2"
        >
          <FaBars size={24} /> Todas las categorías
        </button>

        <LateralMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />

        <div className="flex-grow sm:flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 text-black rounded-md"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/account"
            className="flex items-center space-x-4 px-4 py-2 rounded-sm hover:bg-gray-100 transition-colors duration-200 gap-2"
          >
            <FaUser size={20} />
          </Link>

          <Link
            to="/cart"
            className="flex items-center space-x-4 px-4 py-2 rounded-sm hover:bg-gray-100 transition-colors duration-200 gap-2"
          >
            <div className="relative">
              <FaShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                3
              </span>
            </div>
            <div className="hidden md:block">Mi cesta</div>
          </Link>
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none px-4 py-2 rounded-sm hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
