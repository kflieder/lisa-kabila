import React, { useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext';

function Categories({ activeTabToCategories, setActiveTabFromCategories, activeCategoryFromProductsPage, idsOfRenderedCategories }: { activeTabToCategories?: "home" | "products"; setActiveTabFromCategories: (tab: "home" | "products") => void; activeCategoryFromProductsPage: number | null; idsOfRenderedCategories: number[]; }) {
    const { lang, t } = useLanguage();

    const [activeCategory, setActiveCategory] = React.useState<number | null>(null);

    function handleCategoryClick(id: number) {
        if (activeTabToCategories === 'home') {
            setActiveTabFromCategories('products');
            setActiveCategory(id);

            setTimeout(() => {
                const element = document.getElementById(id.toString());
                if (element) {
                    const yOffset = window.innerWidth < 640 ? -40 : -80;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                   
                }
            }, 50);
        } else {
            setActiveCategory(id);
            const element = document.getElementById(id.toString());
            if (element) {
                const yOffset = window.innerWidth < 640 ? -50 : -80;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
               
            }
        }
    }
    

    const categories = [
        { id: 1, name: t("bags", lang) },
        { id: 2, name: t("coin_purses", lang) },
        { id: 3, name: t("scarves", lang) },
        { id: 4, name: t("jewelry", lang) },
        { id: 5, name: t("pillows", lang) },
        { id: 6, name: t("dresses", lang) },
    ];

    useEffect(() => {
        if (activeTabToCategories === 'home') {
            setActiveCategory(null);
        }
    }, [activeTabToCategories]);

    useEffect(() => {
        if (activeCategoryFromProductsPage !== null) {
            setActiveCategory(activeCategoryFromProductsPage);
        }
    }, [activeCategoryFromProductsPage]);

    
console.log('Rendered Categories IDs:', idsOfRenderedCategories);
    
  return (
    <>
        <ul className='flex items-center justify-center sm:justify-start sm:gap-6 sm:text-base text-sm flex-wrap mr-4'>
            {categories.map((category) => (
                <li key={category.id} onClick={() => handleCategoryClick(category.id)} className={`whitespace-nowrap cursor-pointer text-stone-700 hover:text-amber-800 font-medium p-1 ${(activeCategory ?? activeCategoryFromProductsPage) === category.id ? "border-b-2 border-amber-600" : "border-b-2 border-transparent"}`}>
                    {category.name}
                </li>
            ))}
        </ul>
    </>
  )
}

export default Categories

