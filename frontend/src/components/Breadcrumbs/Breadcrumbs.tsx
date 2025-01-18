import { CategoryWithBreadcrumb } from "@pcc/shared";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  categoryWithBreadcrumb: CategoryWithBreadcrumb;
  isLastClickable?: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  categoryWithBreadcrumb,
  isLastClickable = false,
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
            <Link to={`/${category.id}`}>{category.name}</Link>
            <FaChevronRight className="text-gray-500 mx-2" />
          </li>
        ))}
        {isLastClickable ? (
          <li className="flex items-center">
            <Link to={`/${categoryWithBreadcrumb.id}`}>
              {categoryWithBreadcrumb.name}
            </Link>
          </li>
        ) : (
          <li className="text-gray-500">{categoryWithBreadcrumb.name}</li>
        )}
      </ol>
    </nav>
  );
};
