import React, { useEffect } from 'react'
import Bags from '../Products/Bags'
import CharlinaEstampada from '../Products/CharlinaEstampada'
import SmallBags from '../Products/SmallBags'
import Pillows from '../Products/Pillows'
import Dresses from '../Products/Dresses'
import Earrings from '../Products/Earrings'
import { useLanguage } from '@/context/LanguageContext';
import EarringsBracelet from '../Products/EarringsBracelet'

function ProductsPage({setActiveCategoryFromProductsPage, setIdsOfRenderedCategories}: {setActiveCategoryFromProductsPage: (id: number | null) => void, setIdsOfRenderedCategories: (ids: number[]) => void}) {
  const { lang, t } = useLanguage();
  

  useEffect(() => {
    const ids = [1,2,3,4,5,6];
    setIdsOfRenderedCategories(ids);
    const onScroll = () => {
      ids.forEach((id) => {
        const element = document.getElementById(id.toString());
        if (!element) return;
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveCategoryFromProductsPage(id);
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);


  
  

  return (
    <div>
      <div id='1'><Bags /></div>
      <div id='2'><SmallBags /></div>
      <div id='3'><CharlinaEstampada /></div>
      <div id='4' className='flex flex-col w-full'>
        <h1 className='ml-3'>{t("jewelry", lang)}</h1>
        <Earrings />
        <EarringsBracelet />
        </div>
      <div id='5'><Pillows /></div>
      <div id='6'><Dresses /></div>
    </div>
  )
}

export default ProductsPage
