import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

function MissionStoryText() {
  const { t, lang } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white/80 sm:p-6 p-3 shadow-sm backdrop-blur-sm sm:w-[60vw]">
        <h1 className="text-2xl font-bold text-center mb-1">{t("mission_title", lang)}</h1>
        <h3 className="font-semibold text-center mb-2">{t("mission_subtitle", lang)}</h3>
      <p className="text-gray-800 leading-relaxed text-center">
        {t("mission_description", lang)}
      </p>
    </div>
  )
}

export default MissionStoryText
