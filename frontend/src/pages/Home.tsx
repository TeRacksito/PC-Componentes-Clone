import { useEffect, useState } from "react";
import { CategoryCard } from "../components/CategoryCard/CategoryCard";
import { Category, Product } from "../types/apiTypes";
import { ProductCard } from "../components/ProductCard/ProductCard";

export function Home() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:5011/?products=8&categories=4")
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

  if (data?.type != "home") {
    return <div>Not found</div>;
  }

  return (
    <div className="space-y-10">
      <section className="bg-orange-500 text-white py-10 rounded-md">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">PC Clone</h1>
          <p className="text-lg">
            <b>Expertos en tecnología</b> con un servicio 5 estrellas
          </p>
        </div>
      </section>

      <section className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Productos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.featuredProducts.map((product: Product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </section>

      <section className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Categorías Destacadas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.featuredCategories.map((category: Category) => (
            <CategoryCard category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}
