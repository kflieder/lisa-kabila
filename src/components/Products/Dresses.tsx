import React from "react";
import ProductCard from "./ProductCard";
import dresses from "../Products/ProductsData/dresses.json";
import { useLanguage } from "@/context/LanguageContext";

function Dresses() {
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

  const titleClass = "sm:text-base text-sm font-semibold";
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <h1 className="font-semibold text-gray-900 mb-6">{t('dresses', lang)}</h1>

      <div className="relative">
        <ul
          id="dresses-list"
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth gap-6 pb-4"
        >
          {dresses.map((dress) => (
             <ProductCard key={dress.id} product={dress} />
           ))}
        </ul>

        <button
          type="button"
          aria-label="Scroll left"
          className="h-34 absolute top-40 sm:top-20 left-0 z-20 rounded-full bg-white/90 hover:bg-white shadow p-2 cursor-pointer"
          onClick={() => scrollNext("dresses-list", "left")}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          className="h-34 absolute top-40 sm:top-20 right-0 z-20 rounded-full bg-white/90 hover:bg-white shadow p-2 cursor-pointer"
          onClick={() => scrollNext("dresses-list", "right")}
        >
          ›
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 w-full">
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Dresses – Unitalla
        </h3>
        <ul className="text-sm text-gray-700 space-y-1 grid sm:grid-cols-2 grid-cols-1">
          <li>
            <span className={titleClass}>Wine (Long, Cotton):</span> 125cm •
            35cm • 47" max
          </li>
          <li>
            <span className={titleClass}>White (Short):</span> 96cm • 36cm •
            52" max
          </li>
          <li>
            <span className={titleClass}>Beige (Short, Multicolor):</span> 96cm
            • 36cm • 59" max
          </li>
          <li>
            <span className={titleClass}>Salmon (Short, Manta):</span> 113cm •
            36cm • 54" max
          </li>
          <li>
            <span className={titleClass}>Beige Flor (Long, ¾ Sleeve):</span>{" "}
            114cm • 36cm • 55" max
          </li>
          <li>
            <span className={titleClass}>Black Flor (Long, Estampado):</span>{" "}
            121cm • 37cm • 52" max
          </li>
          <li>
            <span className={titleClass}>King Blue (Long, Manta):</span> 128cm
            • 36cm • 52" max
          </li>
        </ul>
      </div>

      <p className="mt-4 text-sm text-gray-500 italic">
        {t("productDisclaimer", lang)}
      </p>
    </div>
  );
}

export default Dresses;
