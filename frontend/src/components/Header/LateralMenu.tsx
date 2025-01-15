import { Category } from "@pcc/shared";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import FocusLock from "react-focus-lock";
import { FaArrowRight, FaBoxOpen, FaTimes } from "react-icons/fa";
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

type CategoryWithHasChildren = Category & { hasChildren: boolean };

export const LateralMenu = forwardRef<LateralMenuHandles>(({}, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<CategoryWithHasChildren[]>(
    [],
  );
  const [parentCategory, setParentCategory] = React.useState<Category | null>(
    null,
  );

  const hasChildren = async (category: Category) => {
    const children = await getChildCategories(category.id);
    return children.length > 0;
  };

  const showMenu = async (category: Category | null) => {
    const children = category
      ? await getChildCategories(category.id)
      : await getRootCategories();

    setCategories(
      (
        await Promise.all(
          children.map(async (c) => ({
            ...c,
            hasChildren: await hasChildren(c),
          })),
        )
      ).sort((a, b) =>
        a.hasChildren === b.hasChildren ? 0 : a.hasChildren ? -1 : 1,
      ),
    );

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

  // if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={
          "fixed inset-0 bg-black/50 z-40 cursor-pointer backdrop-blur-[1.5px] " +
          (isOpen ? "block" : "hidden")
        }
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      ></div>

      <FocusLock>
        <nav
          className={
            "overflow-y-auto fixed top-0 h-full pb-30 w-full left-0 sm:w-80 bg-white shadow-lg z-500 transition-transform duration-300 ease-in-out " +
            (isOpen ? "transform translate-x-0" : "transform -translate-x-full")
          }
          aria-label="Main Navigation"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-0 right-0 w-full text-gray-700 hover:text-gray-900 p-4 rounded-sm hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
            aria-label="Close Menu"
          >
            <FaTimes size={24} className="float-right sm:float-start" />
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
            {parentCategory && (
              <Link
                to={`/${parentCategory.id}`}
                className="text-2xl text-gray-700 hover:text-orange-500 transition-colors duration-200 text-wrap"
                onClick={() => setIsOpen(false)}
              >
                {parentCategory.name}
                <p className="text-base underline">Ver todo</p>
              </Link>
            )}
            {parentCategory && <hr />}

            {categories.map((category) => (
              <li key={category.id} className="space-x-2">
                <div className="inline-flex flex-col items-start flex-wrap space-x-2 ml-4">
                  {category.hasChildren ? (
                    <span
                      onClick={() => showMenu(category)}
                      className="text-lg text-gray-700 hover:text-orange-500 transition-colors duration-200 text-wrap flex flex-row cursor-pointer items-center"
                    >
                      {category.name}
                      <FaArrowRight size={16} className="ml-2" />
                    </span>
                  ) : (
                    <Link
                      to={`/${category.id}`}
                      className="text-lg text-gray-700 hover:text-orange-500 transition-colors duration-200 text-wrap"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.name}
                    </Link>
                  )}
                  {/* <span
                    onClick={() => showMenu(category)}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer flex items-center"
                  >
                    <FaBoxOpen size={16} className="mr-2" />
                    Ver más
                  </span> */}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </FocusLock>
    </>
  );
});
