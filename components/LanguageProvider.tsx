import React, { useState, useRef, useEffect } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

function LanguageProvider() {
  const t = useTranslations("LocaleSwitcher");

  type Language = {
    language: string;
    country: string;
    code: string;
    isBeta?: boolean;
  };

  const languages: Language[] = Object.entries(
    (t.raw("LocaleSwitcher") as Record<string, { language: string; country: string }>) ?? {}
  ).map(([code, value]) => ({
    code,
    language: value.language,
    country: value.country,
  }));
  

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Détection de la langue du système et sélection de la langue par défaut
  useEffect(() => {
    const systemLang = navigator.language; // Ex: "fr-FR"
    const defaultLang =
      languages.find((lang) => lang.code === systemLang) || languages[0]; // Fallback
    setSelectedLanguage(defaultLang);
  }, [languages]);

  // Fermer le menu lorsqu'on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
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

      {/* Liste déroulante */}
      {isDropdownOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-10 -left-5 min-w-[250px] h-[70vh] overflow-y-auto rounded-2xl shadow-2xl bg-white no-scrollbar"
        >
          {languages.map((language) => (
            <div
              key={language.code}
              className="flex justify-between text-sm font-light mt-4 px-4 py-1 items-center hover:bg-gray-100 w-full cursor-pointer"
              onClick={() => {
                setSelectedLanguage(language);
                setIsDropdownOpen(false);
              }}
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
  );
}

export default LanguageProvider;
