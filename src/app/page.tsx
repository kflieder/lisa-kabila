'use client';
import Header from "@/components/Header";
import HomePage from "@/components/Pages/HomePage";
import ProductsPage from "@/components/Pages/ProductsPage";
import React, { useState } from "react";


export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'products'>('home');
  const [activeCategoryFromProductsPage, setActiveCategoryFromProductsPage] = useState<number | null>(null);
  const [idsOfRenderedCategories, setIdsOfRenderedCategories] = useState<number[]>([]);
 

  return (
    <div className="">
      <Header activeTabFromHome={activeTab} setActiveTabFromHeader={setActiveTab} activeCategoryFromProductsPage={activeCategoryFromProductsPage} idsOfRenderedCategories={idsOfRenderedCategories} />
      <div className="">
      {
        activeTab === 'home' && (
          <HomePage setActiveTabFromImageSliderFromHomePage={setActiveTab} />
        )
      }
      {
        activeTab === 'products' && (
          <ProductsPage setActiveCategoryFromProductsPage={setActiveCategoryFromProductsPage} setIdsOfRenderedCategories={setIdsOfRenderedCategories} />
        )
      }
      </div>
     </div>
    
  );
}
