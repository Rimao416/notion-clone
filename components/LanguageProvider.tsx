import React, { useState, useRef, useEffect, useMemo } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n/config";
import LanguageProviderModal from "@/modals/LanguageProviderModal";
import useLanguageProviderModal from "@/hooks/useLanguageProviderModal";

function LanguageProvider() {
  const t = useTranslations();
  const locale = useLocale();
  const [actualLocale, setActualLocale] = useState(locale);
  const [langTemp, setLangTemp] = useState<Language | null>(null);
  const LanguageProviderModalFunc = useLanguageProviderModal();

  type Language = {
    language: string;
    country: string;
    code: string;
    isBeta?: boolean;
  };

  const getLanguages = (): Language[] => {
    const localeData = t.raw("LocaleSwitcher") as Record<
      string,
      { language: string; country: string; code: string }
    > | null;

    if (!localeData) {
      console.error("⚠️ Erreur: LocaleSwitcher est introuvable !");
      return [];
    }

    return Object.entries(localeData).map(([key, value]) => ({
      code: value.code || key,
      language: value.language,
      country: value.country,
    }));
  };

  const languages = useMemo(() => getLanguages(), [t]);

  const sortedLanguages = useMemo(() => {
    return [...languages].sort((a, b) => {
      if (a.code === locale) return -1;
      if (b.code === locale) return 1;
      return 0;
    });
  }, [languages, locale]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const defaultLanguage = languages.find((lang) => lang.code === locale) || null;
    setSelectedLanguage(defaultLanguage);
  }, [locale, languages]);

  function onChange(value: string, event: React.MouseEvent) {
    event.stopPropagation();
    const newLocale = value as Locale;
    setLangTemp(languages.find((lang) => lang.code === newLocale) || null); 

    if (newLocale === actualLocale) {
      setIsDropdownOpen(false);
      return;
    }

    setIsDropdownOpen(false);

    setTimeout(() => {
      LanguageProviderModalFunc.onOpen();
      setActualLocale(newLocale);
    }, 100);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div
        className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg relative"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <Image src="/globe.svg.png" alt="globe" width={15} height={15} />
        <p className="text-sm text-gray-500 font-light ml-2">
          {selectedLanguage?.country || "Langue"}
        </p>
        <span className="ml-1">
          <IoChevronDownOutline />
        </span>

        {isDropdownOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-10 -left-5 min-w-[250px] h-[70vh] overflow-y-auto rounded-2xl shadow-2xl bg-white no-scrollbar"
          >
            {sortedLanguages.map((language) => (
              <div
                key={language.code}
                className="flex justify-between text-sm font-light mt-4 px-4 py-1 items-center hover:bg-gray-100 w-full cursor-pointer"
                onClick={(event) => onChange(language.code, event)}
              >
                <div>
                  <p className="font-normal">{language.country}</p>
                  <p className="text-xs">{language.language}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
      <LanguageProviderModal locale={actualLocale as Locale} selectedLanguage={langTemp?.country} />
    </>
  );
}

export default LanguageProvider;