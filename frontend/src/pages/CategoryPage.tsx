import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumbs/Breadcrumbs";
import { LinkButton } from "../components/Buttons/LinkButton";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { PageNavigator } from "../components/Buttons/PageNavigator";
import {
  Category,
  CategoryWithBreadcrumb,
  PaginatedProducts,
  Product,
} from "@pcc/shared";

const TRANSLATE_ORDER_CRITERIA: { [key: string]: string } = {
  offer: "Oferta",
  priceDesc: "Precio más alto",
  priceAsc: "Precio más bajo",
};

export function CategoryPage({
  categoryWithBreadcrumb,
}: {
  categoryWithBreadcrumb: CategoryWithBreadcrumb;
}) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const location = useLocation();

  useEffect(() => {
    const fetchData = () => {
      const url = `http://localhost:5011/${
        categoryWithBreadcrumb.id
      }/products/${window.location.pathname.split("/")[3] + location.search}`;

      fetch(url)
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
  }, [location.pathname, location.search, categoryWithBreadcrumb.id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!data || data.type !== "products") return <div>No products found</div>;

  console.log(data);

  const {
    products: productsData,
    page: currentPage,
    maxPages,
    orderCriteria,
    availableOrderCriteria,
    totalProducts,
  } = data.data as PaginatedProducts;

  return (
    <div className="container mx-auto">
      <Breadcrumb categoryWithBreadcrumb={categoryWithBreadcrumb} />
      <h1 className="text-2xl font-semibold mb-6">
        {categoryWithBreadcrumb.name}
      </h1>
      <div className="flex items-center justify-end mb-6 gap-4">
        <div className="grid grid-flow-col gap-2">
          {availableOrderCriteria.map((criteria) => (
            <LinkButton
              key={criteria}
              label={TRANSLATE_ORDER_CRITERIA[criteria]}
              queryParams={{ orderCriteria: criteria, page: 1 }}
              className={`${
                orderCriteria === criteria
                  ? "border-orange-500"
                  : "border-gray-300"
              } p-2 px-4 rounded-sm text-sm border hover:border-white transition-colors`}
            />
          ))}
        </div>
        <div>
          <span className="text-sm text-gray-500">
            Mostrando {productsData.length} de {totalProducts} productos
          </span>
        </div>
      </div>
      <div>
        <span className="text-sm text-gray-500">
          Página {currentPage} de {maxPages}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {productsData.map((product) => (
          <ProductCard key={product.id} productWithFlags={product} />
        ))}
      </div>
      <div>
        <span className="text-sm text-gray-500">
          Página {currentPage} de {maxPages}
        </span>
      </div>
      <div className="flex items-center justify-center mt-6 gap-4">
        <LinkButton
          label="Principio"
          queryParams={{ page: currentPage - 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          className={`${
            currentPage === 1 ? "pointer-events-none" : ""
          } p-2 px-4 rounded-sm text-sm border border-gray-300 hover:border-white transition-colors`}
          disabled={currentPage === 1}
        />
        <LinkButton
          label="Anterior"
          queryParams={{ page: currentPage - 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          className={`${
            currentPage === 1 ? "pointer-events-none" : ""
          } p-2 px-4 rounded-sm text-sm border border-gray-300 hover:border-white transition-colors`}
          disabled={currentPage === 1}
        />

        {Array.from({ length: Math.min(3, currentPage - 1) }, (_, i) => (
          <LinkButton
            key={currentPage - i - 1}
            label={`${currentPage - i - 1}`}
            queryParams={{ page: currentPage - i - 1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
            className="p-2 px-4 rounded-sm text-sm border border-gray-300 hover:border-white transition-colors"
          />
        )).reverse()}

        {maxPages > 6 ? (
          <PageNavigator currentPage={currentPage} maxPages={maxPages} />
        ) : null}

        {Array.from({ length: Math.min(3, maxPages - currentPage) }, (_, i) => (
          <LinkButton
            key={currentPage + i + 1}
            label={`${currentPage + i + 1}`}
            queryParams={{ page: currentPage + i + 1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
            className="p-2 px-4 rounded-sm text-sm border border-gray-300 hover:border-white transition-colors"
          />
        ))}

        <LinkButton
          label="Siguiente"
          queryParams={{ page: currentPage + 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          className={`${
            currentPage === maxPages ? "pointer-events-none" : ""
          } p-2 px-4 rounded-sm text-sm border border-gray-300 hover:border-white transition-colors`}
          disabled={currentPage === maxPages}
        />
        <LinkButton
          label="Final"
          queryParams={{ page: maxPages }}
          onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          className={`${
            currentPage === maxPages ? "pointer-events-none" : ""
          } p-2 px-4 rounded-sm text-sm border border-gray-300 hover:border-white transition-colors`}
          disabled={currentPage === maxPages}
        />
      </div>
    </div>
  );
}
