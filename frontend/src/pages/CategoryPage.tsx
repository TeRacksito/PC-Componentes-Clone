import { useEffect, useState } from "react";
import { Category } from "../types/apiTypes";

export function CategoryPage({ category }: { category: Category }) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = () => {
      fetch(
        `http://localhost:5011/${
          window.location.pathname + window.location.search
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          setError("Failed to fetch data");
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-6">{category.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.products.map((product: any) => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
            <a href={`/product/${product.id}`} className="block">
              <h3 className="font-medium">{product.name}</h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
