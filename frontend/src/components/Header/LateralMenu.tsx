import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaHome, FaBoxOpen, FaShoppingCart } from "react-icons/fa";
import FocusLock from "react-focus-lock";

interface LateralMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export function LateralMenu({
  isOpen,
  toggleMenu,
}: LateralMenuProps): React.ReactElement | null {
  // prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // close menu ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        toggleMenu();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, toggleMenu]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 cursor-pointer backdrop-blur-[1.5px]"
        onClick={toggleMenu}
        aria-hidden="true"
      ></div>

      <FocusLock>
        <nav
          className="fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
          aria-label="Main Navigation"
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 left-4 text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Close Menu"
          >
            <FaTimes size={24} />
          </button>
          <ul className="flex flex-col mt-16 space-y-6 p-6">
            <li>
              <Link
                to="/"
                className="flex items-center text-lg text-gray-700 hover:text-blue-500 transition-colors duration-200"
                onClick={toggleMenu}
              >
                <FaHome className="mr-3" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="flex items-center text-lg text-gray-700 hover:text-blue-500 transition-colors duration-200"
                onClick={toggleMenu}
              >
                <FaBoxOpen className="mr-3" />
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="flex items-center text-lg text-gray-700 hover:text-blue-500 transition-colors duration-200"
                onClick={toggleMenu}
              >
                <FaShoppingCart className="mr-3" />
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </FocusLock>
    </>
  );
}
