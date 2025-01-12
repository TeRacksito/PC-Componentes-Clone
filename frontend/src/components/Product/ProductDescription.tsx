interface ProductDescriptionProps {
  description: string;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
}) => {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold">Description</h2>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};
