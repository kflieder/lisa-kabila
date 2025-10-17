import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

function HomeBottomText() {
  const { t, lang } = useLanguage();
  return (
    <div>
    <div className="mx-auto max-w-3xl rounded-lg border-2 border-dashed border-amber-300 bg-amber-50 px-4 py-5 shadow-sm">
        <p className="text-amber-900">
            <span className="font-semibold">{t("bottom_disclaimer_bold", lang)}</span> {t("bottom_disclaimer", lang)}
        </p>
    </div>
    </div>
  )
}

export default HomeBottomText
