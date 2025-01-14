import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
    <div className="relative w-full overflow-hidden mb-5">
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="flex-shrink-0 w-full">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={img}
                alt="Product"
                className="w-auto h-auto max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
        <button
          onClick={handlePrev}
          className="bg-gray-800 text-white p-2 rounded-full"
        >
          <FaChevronLeft />
        </button>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
        <button
          onClick={handleNext}
          className="bg-gray-800 text-white p-2 rounded-full"
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="flex justify-center mt-2 space-x-2">
        {images.map((thumb, idx) => (
          <button
            key={idx}
            onMouseEnter={() => setActiveIndex(idx)}
            onClick={() => setActiveIndex(idx)}
            className={
              "p-1 rounded border-2 transition-colors cursor-pointer " +
              (idx === activeIndex ? "border-gray-800" : "border-gray-400")
            }
            style={{ width: 50, height: 50 }}
          >
            <img
              src={thumb}
              alt="Thumbnail"
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
