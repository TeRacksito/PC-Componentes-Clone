import React from "react";
import { Category } from "../../types/apiTypes";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  breadcrumb: Category[];
  category: Category;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumb,
  category,
}) => {
  const breadcrumbWithHome = [
    { id: "", name: "Home", parent_id: "" },
    ...breadcrumb,
  ];

  return (
    <nav className="text-sm mb-6">
      <ol className="flex list-none p-0">
        {breadcrumbWithHome.map((category) => (
          <li key={category.id} className="flex items-center">
            <Link to={`/${category.id}`} className="">
              {category.name}
            </Link>
            <FaChevronRight className="text-gray-500 mx-2" />
          </li>
        ))}
        <li className="text-gray-500">{category.name}</li>
      </ol>
    </nav>
  );
};
