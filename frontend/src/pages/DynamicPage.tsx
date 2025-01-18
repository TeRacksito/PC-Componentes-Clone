import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoryPage } from "./CategoryPage";
import { ProductPage } from "./ProductPage";
import { CategoryWithBreadcrumb, ProductWithFlags } from "@pcc/shared";
import { Error404Page } from "./Error404Page";
import { LoadingCircle } from "../components/Loading/LoadingCircle";
import { dynamicFetch } from "../services/dynamicService";

export function DynamicPage() {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async (slug: string) => {
      setData(await dynamicFetch(slug));
      setIsLoading(false);
    };

    if (slug) {
      fetchData(slug);
    }
  }, [slug]);

  if (isLoading) return <LoadingCircle />;
  if (error) return <div>{error}</div>;

  if (data?.type === "product") {
    const productWithFlags = data?.data as ProductWithFlags;
    return <ProductPage productWithFlags={productWithFlags} />;
  } else if (data?.type === "category") {
    const categoryWithBreadcrumb = data?.data as CategoryWithBreadcrumb;
    return <CategoryPage categoryWithBreadcrumb={categoryWithBreadcrumb} />;
  } else {
    return <Error404Page />;
  }
}
