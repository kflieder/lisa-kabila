// src/context/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import languageData from "@/components/languageData.json";

type Language = "es" | "en";

type LanguageContextType = {
  lang: Language;
  toggleLanguage: () => void;
  setLanguage: (language: Language) => void;
  t: (key: any, lang: Language) => string;
};

type TranslationKey = "home" | "products" | "cart" | "checkout" | "thankYou";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("es"); // default Spanish
  const translations = languageData as Record<
    TranslationKey | `${TranslationKey}_en`,
    string
  >;
  const toggleLanguage = () => {
    setLang((prev) => (prev === "es" ? "en" : "es"));
  };

  function t<K extends TranslationKey>(key: K, lang: "es" | "en") {
    return lang === "en" ? translations[`${key}_en`] : translations[key];
  }

  return (
    <LanguageContext.Provider
      value={{ lang, toggleLanguage, setLanguage: setLang, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
