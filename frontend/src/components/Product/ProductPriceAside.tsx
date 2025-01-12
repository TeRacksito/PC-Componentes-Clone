interface ProductPriceAsideProps {
  price: number;
  discount: number;
}

export const ProductPriceAside: React.FC<ProductPriceAsideProps> = ({
  price,
  discount,
}) => {
  const discountedPrice = price - price * (discount / 100);

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold">Price</h2>
      <p className="mt-2 text-gray-600">
        <span className="line-through">${price}</span>
        <span className="ml-2">${discountedPrice}</span>
      </p>
    </div>
  );
};
