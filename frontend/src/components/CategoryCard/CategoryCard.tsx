import { Category } from "../../types/apiTypes";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="bg-gray-100 hover:bg-gray-200 text-center p-4 rounded-md shadow-md">
      <a href={`/${category.id}`} className="block">
        <h3 className="font-medium">{category.name}</h3>
      </a>
    </div>
  );
}
