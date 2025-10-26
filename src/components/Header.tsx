"use client";
import React, { useState, useRef, useEffect } from "react";
import Cart from "./Pages/Cart";
import { useLanguage } from "@/context/LanguageContext";
import Categories from "./Categories";

function Header({
  setActiveTabFromHeader,
  activeTabFromHome,
  activeCategoryFromProductsPage,
  idsOfRenderedCategories,
}: {
  activeTabFromHome: "home" | "products";
  setActiveTabFromHeader: (tab: "home" | "products") => void;
  activeTabToCategories?: string;
  activeCategoryFromProductsPage: number | null;
  idsOfRenderedCategories: number[];
}) {
  const [showCart, setShowCart] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const cartIconRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
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

  // Scroll handler to toggle fixed categories
  useEffect(() => {
    const onScroll = () => {
      if (!categoriesRef.current) return;

      // Where the categories are relative to viewport
      const catRect = categoriesRef.current.getBoundingClientRect();

      // We want categories to fix to top of viewport when its top <= 0
      // (you can adjust threshold here if you want it a few px earlier)
      const shouldFix = scrollY > 0 && catRect.top <= 0;

      if (shouldFix !== isFixed) {
        setIsFixed(shouldFix);
      }

      // update placeholder height to avoid layout jump
    };

    // throttle using requestAnimationFrame pattern
    let ticking = false;
    const rafHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // initial run
    onScroll();
    window.addEventListener("scroll", rafHandler, { passive: true });
    window.addEventListener("resize", rafHandler);
    return () => {
      window.removeEventListener("scroll", rafHandler);
      window.removeEventListener("resize", rafHandler);
    };
  }, [isFixed]);

  function handleTabClick(tab: "home" | "products") {
    setActiveTabFromHeader(tab);
  }

  function handleCartClick() {
    setShowCart(!showCart);
  }

  return (
    <>
      <div
        ref={headerRef}
        className="w-full py-1 shadow-sm px-2 flex items-start justify-between gap-8 bg-white"
      >
        <a
          href="/"
          className="sm:flex hidden items-center gap-3 border border-gray-300 rounded-full shrink-0"
        >
          <img
            className="sm:h-42 sm:w-42 h-16 w-16 rounded-full"
            src="/logo.jpg"
            alt="Logo"
          />
        </a>

        <div className="flex sm:flex-col w-full gap-10">
          <a
            href="/"
            className="flex sm:hidden items-center gap-3 border border-gray-300 rounded-full shrink-0"
          >
            <img
              className="sm:h-42 sm:w-42 h-16 w-16 rounded-full"
              src="/logo.jpg"
              alt="Logo"
            />
          </a>
          <nav className="flex sm:items-end items-center w-full sm:flex-col justify-start gap-2">
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

          {/* original categories in header */}
          <div ref={categoriesRef} className="w-full sm:block hidden pl-[4vw]">
            <Categories
              activeTabToCategories={activeTabFromHome}
              setActiveTabFromCategories={setActiveTabFromHeader}
              activeCategoryFromProductsPage={activeCategoryFromProductsPage}
              idsOfRenderedCategories={idsOfRenderedCategories}
            />
          </div>
        </div>
      </div>
      {!isFixed && (
        <div className="sm:hidden block w-full">
          <Categories
            activeTabToCategories={activeTabFromHome}
            setActiveTabFromCategories={setActiveTabFromHeader}
            activeCategoryFromProductsPage={activeCategoryFromProductsPage}
            idsOfRenderedCategories={idsOfRenderedCategories}
          />
        </div>
      )}

      {/* fixed clone when stuck */}
      {isFixed && (
        <div
          className="fixed sm:flex justify-around left-0 right-0 top-0 z-50 bg-white shadow-sm sm:p-4"
          // optional: add border-b or subtle shadow so it reads as separated
        >
          <div className="max-w-[100%] mx-auto sm:hidden flex flex-col w-full">
            <nav className="flex items-center w-full sm:flex-col justify-center gap-2">
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
            <Categories
              activeTabToCategories={activeTabFromHome}
              setActiveTabFromCategories={setActiveTabFromHeader}
              activeCategoryFromProductsPage={activeCategoryFromProductsPage}
              idsOfRenderedCategories={idsOfRenderedCategories}
            />
            
          </div>
          <div className="max-w-[100%] mx-auto hidden sm:flex flex-col w-full pl-50">
          <Categories
              activeTabToCategories={activeTabFromHome}
              setActiveTabFromCategories={setActiveTabFromHeader}
              activeCategoryFromProductsPage={activeCategoryFromProductsPage}
              idsOfRenderedCategories={idsOfRenderedCategories}
            />
          </div>
          <p
            ref={cartIconRef}
            className={`relative pb-1 font-medium transition-colors items-center gap-2 cursor-pointer sm:inline-flex hidden ${
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
          {showCart && (
            <div className="" ref={cartRef}>
              <Cart />
            </div>
          )}
        </div>
      )}
      {
        isFixed && (
          <div className="h-10"></div>
        )
      }

      {showCart && !isFixed && (
        <div ref={cartRef}>
          <Cart />
        </div>
      )}
    </>
  );
}

export default Header;
