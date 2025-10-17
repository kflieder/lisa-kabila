import React from "react";
import { useLanguage } from "@/context/LanguageContext";



function HomeTextBox() {
  const { t, lang } = useLanguage();

  return (
    <div className="relative sm:w-80 w-[90vw] rounded-3xl overflow-hidden shadow-xl border border-white/40 bg-gradient-to-br from-rose-50 via-amber-50 to-rose-100 backdrop-blur-sm sm:order-1 order-2">
      {/* Soft ambient glow blobs */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-rose-400/10 blur-3xl"
      />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center p-8 text-center gap-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold italic bg-gradient-to-r from-rose-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
          {t("homeTextBox_title", lang)}
        </h2>

        <div className="h-1 w-12 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full" />

        <p className="text-slate-700 text-lg leading-relaxed font-medium max-w-sm">
          {t("homeTextBox_description", lang)}
        </p>

        <p className="text-slate-600 text-base italic">
          {t("homeTextBox_subDescription", lang)}
        </p>
      </div>
    </div>
  );
}

export default HomeTextBox;
