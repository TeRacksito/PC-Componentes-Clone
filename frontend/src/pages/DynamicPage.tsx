import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoryPage } from "./CategoryPage";
import { ProductPage } from "./ProductPage";
import { CategoryWithBreadcrumb } from "@pcc/shared";

export function DynamicPage() {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://localhost:5011/${slug}`)
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

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;  

  if (data?.type === "product") {
    return <ProductPage product={data.data} />;
  } else if (data?.type === "category") {
    const categoryWithBreadcrumb = data?.data as CategoryWithBreadcrumb;
    return <CategoryPage categoryWithBreadcrumb={categoryWithBreadcrumb} />;
  } else {
    return <div>Not found</div>;
  }
}
