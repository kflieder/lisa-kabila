import React from 'react'
import { useLanguage } from '@/context/LanguageContext';

function Categories() {
    const { lang, t } = useLanguage();

    const Categories = [
        { id: 1, name: t("bags", lang) },
        { id: 2, name: t("small_bags", lang) },
        { id: 3, name: t("coin_purses", lang) },
        { id: 4, name: t("scarves", lang) },
        { id: 5, name: t("jewelry", lang) },
        { id: 6, name: t("pillows", lang) },
        { id: 7, name: t("dresses", lang) },
    ];

  return (
    <>
        <ul className='flex items-center justify-start gap-6 overflow-x-auto flex-wrap'>
            {Categories.map((category) => (
                <li key={category.id} className='whitespace-nowrap cursor-pointer text-stone-700 hover:text-amber-800 font-medium'>
                    {category.name}
                </li>
            ))}
        </ul>
    </>
  )
}

export default Categories

