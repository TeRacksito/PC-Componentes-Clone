import { useState } from "react";

interface ProductImageCarouselProps {
  images: string[];
}

export const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
  images,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="relative">
      <img
        src={images[activeIndex]}
        alt="Product"
        className="w-full h-96 object-cover"
      />
      <div className="absolute top-1/2 left-4">
        <button
          onClick={handlePrev}
          className="bg-gray-800 text-white p-2 rounded-full"
        ></button>
      </div>
      <div className="absolute top-1/2 right-4">
        <button
          onClick={handleNext}
          className="bg-gray-800 text-white p-2 rounded-full"
        ></button>
      </div>
    </div>
  );
};
