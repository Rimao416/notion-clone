"use client";
import React from "react";
import Modal from "./Modal";
import useLanguageProviderModal from "@/hooks/useLanguageProviderModal";
import { setUserLocale } from "@/services/locale";
import { useTranslations } from "next-intl";
interface LanguageProviderModalProps {
  locale:
    | "en"
    | "ko"
    | "ja"
    | "fr"
    | "de"
    | "es"
    | "pt"
    | "fi"
    | "da"
    | "no"
    | "sv";
  selectedLanguage?: string;
}

function LanguageProviderModal({
  locale,
  selectedLanguage,
}: LanguageProviderModalProps) {
  const LanguageProviderModal = useLanguageProviderModal();
  const t = useTranslations();

  return (
    <Modal
      isOpen={LanguageProviderModal.isOpen}
      onClose={LanguageProviderModal.onClose}
    >
      <h4 className="text-sm font-medium text-center">
        {t("switwLanguageText")} {selectedLanguage} ?
      </h4>
      <div className="flex gap-2 mt-4 flex-col">
        <button
          className="py-2 px-3 bg-[#EB57571A] text-white rounded-lg transition w-full border border-[#EB5757]"
          onClick={() => {
            LanguageProviderModal.onClose();
            setUserLocale(locale);
          }}
        >
          <p className="text-sm font-normal text-[#EB5757]">Modifier</p>
        </button>
        <button
          className="py-2 px-3 border border-gray-300 rounded-lg transition w-full"
          onClick={LanguageProviderModal.onClose}
        >
          <p className="text-sm font-normal text-gray-700">Annuler</p>
        </button>
      </div>
    </Modal>
  );
}

export default LanguageProviderModal;
