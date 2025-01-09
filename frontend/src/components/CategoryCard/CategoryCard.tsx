import { Category } from "@pcc/shared";
import { Link } from "react-router-dom";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link to={`/${category.id}`} className="block">
      <div className="bg-gray-100 hover:bg-gray-200 text-center p-4 rounded-md shadow-md">
        <h3 className="font-medium">{category.name}</h3>
      </div>
    </Link>
  );
}
