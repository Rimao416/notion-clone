"use client";
import LanguageProvider from "@/components/LanguageProvider";
import LoginButton from "@/components/LoginButton";
import { useTranslations } from "next-intl";
import Image from "next/image";

function LoginPage() {
  const t=useTranslations("login")
  return (
    <section>
      <div className="fixed top-6 left-5 w-full z-50">
        <div className="flex gap-4 items-center">
          <Image
            src="/Notion-logo.svg"
            alt="Notion-logo"
            width={30}
            height={30}
            className="inline-block"
          />
          <div className="h-6 border-l border-gray-300"></div>

          {/* Bouton de sélection de langue */}
          <LanguageProvider />
        </div>
      </div>

      {/* Section Connexion */}
      <div className="flex flex-col items-center justify-center h-screen max-w-[300px] mx-auto">
        <h1 className="text-xl text-black font-[600]">
          {t("title")}{" "}
          <span className="text-gray-400">
            {t("subtitle")}
          </span>{" "}
        </h1>
        <div className="mt-6 w-full relative">
          <LoginButton
            text={t("withGoogle")}
            icon="/google.png"
            onClick={() => console.log("Google")}
          />
          <LoginButton
            text={t("withApple")}
            icon="/apple.png"
            onClick={() => console.log("Apple")}
          />
          <LoginButton
            text={t("withAccessKey")}
            icon="/access.png"
            onClick={() => console.log("Clé d'accès")}
          />
          <LoginButton
            text={t("withSso")}
            icon="/building.png"
            onClick={() => console.log("SSO")}
          />
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
