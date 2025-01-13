import { Category } from "@pcc/shared";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import FocusLock from "react-focus-lock";
import { FaBoxOpen, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  getChildCategories,
  getParentCategory,
  getRootCategories,
} from "../../services/categoryService";

export interface LateralMenuHandles {
  showMenu: (category: Category | null) => void;
  hideMenu: () => void;
  isOpen: boolean;
}

export const LateralMenu = forwardRef<LateralMenuHandles>(({}, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [parentCategory, setParentCategory] = React.useState<Category | null>(
    null,
  );

  const showMenu = (category: Category | null) => {
    if (category) {
      getChildCategories(category.id).then((cat) => setCategories(cat));
    } else {
      getRootCategories().then((cat) => setCategories(cat));
    }

    setParentCategory(category);
    setIsOpen(true);
  };

  const goBack = async () => {
    try {
      if (!parentCategory || !parentCategory.parent_id) {
        showMenu(null);
        return;
      }
      const parent = await getParentCategory(parentCategory!.id);
      showMenu(parent);
    } catch (error) {
      showMenu(null);
    }
  };

  useImperativeHandle(ref, () => ({
    showMenu,
    hideMenu() {
      setIsOpen(false);
    },
    isOpen,
  }));

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

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 cursor-pointer backdrop-blur-[1.5px]"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      ></div>

      <FocusLock>
        <nav
          className="overflow-y-auto fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 left-4 text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Close Menu"
          >
            <FaTimes size={24} />
          </button>
          <ul className="flex flex-col mt-16 space-y-6 p-6">
            {parentCategory && (
              <li>
                <button
                  onClick={() => goBack()}
                  className="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
                >
                  Volver
                </button>
              </li>
            )}
            {categories.map((category) => (
              <li
                key={category.id}
                className="space-x-2"
                style={{ scrollbarGutter: "unset" }}
              >
                <div className="inline-flex flex-col items-start flex-wrap space-x-2">
                  <Link
                    to={`/${category.id}`}
                    className="text-lg text-gray-700 hover:text-orange-500 transition-colors duration-200 text-wrap"
                    onClick={() => setIsOpen(false)}
                  >
                    {category.name}
                  </Link>
                  <span
                    onClick={() => showMenu(category)}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer flex items-center"
                  >
                    <FaBoxOpen size={16} className="mr-2" />
                    Ver más
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </FocusLock>
    </>
  );
});
