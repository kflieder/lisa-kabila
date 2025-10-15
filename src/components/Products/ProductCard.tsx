import React from "react";
import { useCart } from "@/context/CartContext";

function ProductCard({
  product,
  styleSelector,
}: {
  product: {
    id: string;
    name: string;
    description: string;
    imageUrls: string[];
    price: number;
  };
  styleSelector?: string;
}) {
  const { reservedProducts, addToCart, removeFromCart } = useCart();
  const isReserved = reservedProducts.includes(product.id);

  return (
    <li
      key={product.id}
      className={`snap-center  ${
        styleSelector === "cart" ? "flex items-end border-b border-gray-300 pb-3" : "flex-none w-full md:w-1/3 lg:w-1/5"
      }`}
    >
      <div className={`bg-white rounded-xl shadow ring-1 ring-gray-100 hover:shadow-md transition-shadow h-full flex flex-col justify-between ${styleSelector === "cart" ? "w-1/2" : ""}`}>
        <div className="aspect-[4/5] w-full overflow-hidden rounded-t-xl bg-gray-100">
          {product.imageUrls.length > 1 ? (
            <div className="relative h-full w-full">
              <div
                id={`pillow-carousel-${product.id}`}
                className="h-full w-full overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory scroll-smooth"
              >
                <div className="flex h-full">
                  {product.imageUrls.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`${product.name} ${idx + 1}`}
                      className="h-full w-full flex-none object-contain snap-center"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                aria-label="Previous image"
                className={`absolute bottom-2 left-[40%] sm:left-[24%] z-10 rounded-full sm:bg-white/80 bg-white sm:hover:bg-white shadow p-2 w-6 h-6 flex items-center justify-center cursor-pointer ${
                  styleSelector === "cart" ? "hidden sm:flex" : ""
                }`}
                onClick={() => {
                  const carousel = document.getElementById(
                    `pillow-carousel-${product.id}`
                  );
                  if (carousel) {
                    carousel.scrollBy({
                      left: -carousel.clientWidth,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next image"
                className={`absolute bottom-2 right-[40%] sm:right-[25%] z-10 rounded-full sm:bg-white/80 bg-white sm:hover:bg-white shadow p-2 w-6 h-6 flex items-center justify-center cursor-pointer ${
                  styleSelector === "cart" ? "hidden sm:flex" : ""
                }`}
                onClick={() => {
                  const carousel = document.getElementById(
                    `pillow-carousel-${product.id}`
                  );
                  if (carousel) {
                    carousel.scrollBy({
                      left: carousel.clientWidth,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                ›
              </button>
            </div>
          ) : (
            <img
              src={product.imageUrls[0]}
              alt={product.name}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          )}
        </div>

        <div
          className={`p-4 flex flex-col justify-between flex-grow ${
            styleSelector === "cart" ? "hidden" : ""
          }`}
        >
          <h2 className="text-lg font-medium text-gray-900 truncate">
            {product.name}
          </h2>
          <p className="mt-1 text-sm text-gray-600">{product.description}</p>
          <div className="flex justify-between">
            <p className="mt-2 text-sm font-semibold text-gray-900">
              Price: ${product.price.toFixed(2)}
            </p>
            <div className="border flex flex-col items-end justify-center rounded-md border-gray-200 px-2 py-1">
            {
              isReserved ? (
                <p className="text-sm text-gray-600 text-center">Product is reserved</p>
              ) : (
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                  onClick={() => {
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              )
            }
            </div>
          </div>
        </div>
      </div>
      {styleSelector === "cart" && (
        
          
        <div className="ml-2 w-full rounded-xl border border-gray-200 bg-gray-50 p-4 pb-0 shadow-sm flex flex-col justify-between h-full">
          
           <div>
              <dd className="text-sm font-bold text-gray-900">{product.name}</dd>
              <dd className="mt-1 text-sm text-gray-600 text-wrap">
                {product.description}
              </dd>
            </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-2">
              <dt className="text-sm text-gray-600 mr-2">Price</dt>
              <dd className="text-sm font-medium text-gray-900 text-right">
                ${product.price.toFixed(2)}
              </dd>
              
            </div>
            <p onClick={() => removeFromCart(product.id)} className="text-xs text-red-600 hover:underline cursor-pointer py-2">
            Remove
          </p>
        </div>
        
      )}
    </li>
  );
}

export default ProductCard;
