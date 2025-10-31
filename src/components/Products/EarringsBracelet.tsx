import React from "react";
import ProductCard from "./ProductCard";
import earringsBracelet from "./ProductsData/earringsBracelet.json";
import { useLanguage } from "@/context/LanguageContext";

function EarringBracelet() {
  const { lang, t } = useLanguage();
  
  

  function scrollNext(listId: string, direction: "left" | "right") {
    const list = document.getElementById(listId);
    if (!list) return;

    const children = Array.from(list.children) as HTMLElement[];
    if (!children.length) return;

    // find the currently most visible item
    const containerCenter = list.scrollLeft + list.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    // move to next or previous
    let targetIndex =
      direction === "right"
        ? Math.min(children.length - 1, closestIndex + 1)
        : Math.max(0, closestIndex - 1);

    const target = children[targetIndex];
    const scrollTo =
      target.offsetLeft - list.clientWidth / 2 + target.clientWidth / 2;

    list.scrollTo({ left: scrollTo, behavior: "smooth" });
  }

  return (
    <div className="mx-auto max-w-full px-4 py-8">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <h1 className="text-3xl font-semibold text-gray-900 mb-6">{t('earrings_bracelets', lang)}</h1>

      <div className="relative">
        <ul
          id="earringsBracelet-list"
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth gap-6 pb-4"
        >
          {earringsBracelet.map((e) => (
            <ProductCard key={e.id} product={e} />
          ))}
        </ul>

        <button
          type="button"
          aria-label="Scroll left"
          className="h-34 absolute top-40 sm:top-20 left-0 z-20 rounded-full bg-white/90 hover:bg-white shadow p-2 cursor-pointer"
          onClick={() => scrollNext("earringsBracelet-list", "left")}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          className="h-34 absolute top-40 sm:top-20 right-0 z-20 rounded-full bg-white/90 hover:bg-white shadow p-2 cursor-pointer"
          onClick={() => scrollNext("earringsBracelet-list", "right")}
        >
          ›
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-500 italic">
        {t("productDisclaimer", lang)}
      </p>
    </div>
  );
}

export default EarringBracelet;

