import { ProductWithFlags } from "@pcc/shared";
import { ProductImageCarousel } from "../components/Product/ProductImageCarousel";
import { ProductDetails } from "../components/Product/ProductDetails";
import { ProductPriceAside } from "../components/Product/ProductPriceAside";
import { ProductDescription } from "../components/Product/ProductDescription";
import { ProductComments } from "../components/Product/ProductComments";

export function ProductPage({
  productWithFlags,
}: {
  productWithFlags: ProductWithFlags;
}) {
  return (
    <div className="container mx-auto p-6">
      {/* First Section: Product and Price/Buy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Section */}
        {/* <div className="lg:col-span-3"> */}
        <ProductImageCarousel
          images={[
            "https://placehold.co/600x400",
            "https://placehold.co/600x500",
          ]}
        />{" "}
        {/* Image carousel component */}
        <ProductDetails productWithFlags={productWithFlags} />{" "}
        {/* Product details component */}
        {/* </div> */}
        {/* Price and Buy Section */}
        {/* <div className="lg:col-span-1"> */}
        <ProductPriceAside
          price={productWithFlags.price}
          discount={productWithFlags.discount}
        />{" "}
        {/* Price and buy aside component */}
        {/* </div> */}
      </div>

      {/* Second Section: Description */}
      <div className="mt-10">
        <ProductDescription description={"Description"} />{" "}
        {/* Description component */}
      </div>

      {/* Third Section: Comments */}
      <div className="mt-10">
        <ProductComments productWithFlags={productWithFlags} />{" "}
        {/* Comments component */}
      </div>
    </div>
  );
}
