'use client';
import Header from "@/components/Header";
import HomePage from "@/components/Pages/HomePage";
import ProductsPage from "@/components/Pages/ProductsPage";
import React, { useState } from "react";


export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'products'>('home');
 
 

  return (
    <>
      <Header activeTabFromHome={activeTab} setActiveTabFromHeader={setActiveTab} />
      <div className="pt-42">
      {
        activeTab === 'home' && (
          <HomePage setActiveTabFromImageSliderFromHomePage={setActiveTab} />
        )
      }
      {
        activeTab === 'products' && (
          <ProductsPage />
        )
      }
      </div>
     </>
    
  );
}
