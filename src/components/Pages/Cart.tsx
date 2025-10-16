import React from "react";
import ProductCard from "../Products/ProductCard";
import { useCart } from "../../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";

function Cart() {
  const { cart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const totalWithShipping = totalPrice + 10000;


  async function handleCheckout() {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    })
    const data = await response.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      console.error('Checkout session error:', data.error);
    }
  }



  return (
    <>
      {cart.length === 0 ? (
        <div className="absolute z-50 top-20 right-0 w-[80vw] sm:w-[30vw] bg-white rounded-xl border border-gray-200 shadow-xl p-6">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="rounded-full bg-gray-100 p-3 ring-1 ring-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3.75h2.4a.75.75 0 0 1 .72.53l.63 2.2m0 0l1.35 4.67a2.25 2.25 0 0 0 2.16 1.65h6.9a2.25 2.25 0 0 0 2.16-1.65l1.35-4.67H6.99m0 0l-.63-2.2M9 20.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm9 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                />
              </svg>
            </div>

            <h2 className="text-lg font-semibold text-gray-800">
              Your cart is empty
            </h2>
            <p className="text-sm text-gray-500">
              Discover unique, one-of-a-kind pieces and add your favorites.
            </p>

            {/* <div className="mt-2 flex items-center gap-2" onClick={}>
              <div className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                Start shopping
              </div>
            </div> */}

            <p className="text-xs text-gray-400">
              Items are reserved for 30 minutes once added.
            </p>
          </div>
        </div>
      ) : (
        <div className="absolute z-50 top-20 right-0 w-[80vw] sm:w-[50vw] h-auto flex flex-col items-center justify-center bg-white rounded-lg border border-gray-600 shadow-lg">
          <ul className="w-full flex flex-col no-scrollbar gap-4 p-4 max-h-[60vh] overflow-auto">
            {cart.map((item) => (
              <ProductCard key={item.id} product={item} styleSelector="cart" />
            ))}
          </ul>
          <div className="w-full p-4">
            <div className="flex justify-between">
              <span className="font-medium">Total:</span>
              <span className="font-medium">${totalPrice / 100} MXN</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Shipping:</span>
              <span className="font-medium">${10000 / 100} MXN</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span className="font-medium">Grand Total:</span>
              <span className="font-medium">
                ${(totalWithShipping / 100).toFixed(2)} MXN
              </span>
            </div>
            <div className="text-sm italic border border-gray-400 bg-gray-100 rounded p-1">
              <p>
                Because each item is one-of-a-kind, items are reserved in your
                cart for 30 minutes. If you’ve been browsing longer, give your
                cart a refresh before checking out.
              </p>
            </div>
          </div>
          <button onClick={handleCheckout}>CheckOut</button>
        </div>
      )}
    </>
  );
}

export default Cart;
