interface ProductPriceAsideProps {
  price: number;
  discount: number;
}

export const ProductPriceAside: React.FC<ProductPriceAsideProps> = ({
  price,
  discount,
}) => {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold">Price</h2>
      <p className="mt-2 text-gray-600 flex items-center">
        <span className="text-4xl text-red-700 font-bold mr-4">
          {Number(price).toFixed(0)}
          <span className="text-base text-red-700 font-bold align-super">
            {
              Number(price - Math.floor(price))
                .toFixed(2)
                .split(".")[1]
            }
            €
          </span>
        </span>

        {discount != 0 ? (
          <span className="text-gray-500 line-through mr-2 text-sm">
            {Math.round(Number(price) / (1 - Number(discount) / 100))}€
          </span>
        ) : null}
        {discount != 0 ? (
          <span className="top-0 left-0 bg-red-700 text-white text-xs font-bold rounded px-2 py-1 z-10">
            -{discount}%
          </span>
        ) : null}
      </p>
    </div>
  );
};
