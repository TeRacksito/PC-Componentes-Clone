import { CategoryWithBreadcrumb } from "@pcc/shared";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  categoryWithBreadcrumb: CategoryWithBreadcrumb;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  categoryWithBreadcrumb,
}) => {
  const breadcrumbWithHome: CategoryWithBreadcrumb[] = [
    { id: "", name: "Home", parent_id: "", breadcrumb: [] },
    ...categoryWithBreadcrumb.breadcrumb,
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
        <li className="text-gray-500">{categoryWithBreadcrumb.name}</li>
      </ol>
    </nav>
  );
};
