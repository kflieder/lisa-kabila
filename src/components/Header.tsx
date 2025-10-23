"use client";
import React, { useState, useRef, useEffect } from "react";
import Cart from "./Pages/Cart";
import { useLanguage } from "@/context/LanguageContext";
import Categories from "./Categories";

function Header({
  setActiveTabFromHeader,
  activeTabFromHome,
}: {
  activeTabFromHome: "home" | "products";
  setActiveTabFromHeader: (tab: "home" | "products") => void;
}) {
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const cartIconRef = useRef<HTMLParagraphElement>(null);
  const { lang, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target as Node) &&
        cartIconRef.current &&
        !cartIconRef.current.contains(event.target as Node)
      ) {
        setShowCart(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCart]);

  function handleTabClick(tab: "home" | "products") {
    setActiveTabFromHeader(tab);
  }

  function handleCartClick() {
    setShowCart(!showCart);
  }

  return (
    <>
      <header className="fixed w-full py-1 shadow-sm px-2 flex items-start justify-between gap-8 bg-white top-0 z-50">
        <a
          href="/"
          className="flex items-center gap-3 border border-gray-300 rounded-full shrink-0"
        >
          <img
            className="sm:h-42 sm:w-42 h-24 w-24 rounded-full"
            src="/logo.jpg"
            alt="Logo"
          />
        </a>

        <div className="flex flex-col w-full gap-10">
          <nav className=" flex items-end flex-col justify-start gap-2">
            <div className="flex items-center gap-3 md:gap-6 order-2">
              <p
                className={`font-medium transition-colors cursor-pointer ${
                  activeTabFromHome === "home"
                    ? "text-amber-900 border-b-2 border-amber-600"
                    : "text-stone-700 border-b-2 border-transparent hover:text-amber-800 hover:border-amber-400"
                }`}
                onClick={() => handleTabClick("home")}
              >
                {t("home", lang)}
              </p>
              <p
                className={`font-medium transition-colors cursor-pointer ${
                  activeTabFromHome === "products"
                    ? "text-amber-900 border-b-2 border-amber-600"
                    : "text-stone-700 border-b-2 border-transparent hover:text-amber-800 hover:border-amber-400"
                }`}
                onClick={() => handleTabClick("products")}
              >
                {t("products", lang)}
              </p>
              <button
                onClick={toggleLanguage}
                className="px-2 border border-stone-700 rounded-md text-xs font-medium text-stone-700 hover:bg-stone-700 hover:text-white transition cursor-pointer"
              >
                {lang === "en" ? "Español" : "English"}
              </button>
              <p
                ref={cartIconRef}
                className={`pb-1 font-medium transition-colors inline-flex items-center gap-2 cursor-pointer ${
                  showCart
                    ? "text-amber-900 border-b-2 border-amber-600"
                    : "text-stone-700 border-b-2 border-transparent hover:text-amber-800 hover:border-amber-400"
                }`}
                onClick={() => {
                  handleCartClick();
                }}
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="17" cy="20" r="1" />
                  <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.5a2 2 0 0 0 2-1.6L21 8H7" />
                </svg>
                <span className="sr-only">Cart</span>
              </p>
            </div>
          </nav>
          <Categories />
        </div>
      </header>

      {showCart && (
        <div ref={cartRef}>
          <Cart />
        </div>
      )}
    </>
  );
}

export default Header;
