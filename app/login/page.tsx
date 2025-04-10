"use client";
import LanguageProvider from "@/components/LanguageProvider";
import LoginButton from "@/components/LoginButton";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
function LoginPage() {
  const [mail, setMail] = useState("");
  const [visible, setVisible] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
    const value=event.target.value
    if (value.trim().length > 0) {
      setVisible(true);

    }else{
      setVisible(false)
    }
  };
  const handleReset=()=>{setMail("")
    setVisible(false)
  }
  const t = useTranslations("login");
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
      <div className="flex flex-col justify-center h-screen max-w-[300px] mx-auto mt-32">
        <h1 className="text-xl text-black font-[600]">
          {t("title")} <span className="text-gray-400">{t("subtitle")}</span>{" "}
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
        {/* SEPARATOR */}
        <div className="w-full h-px bg-gray-200 my-3"></div>
        <form className="flex flex-col w-full">
          <label
            htmlFor="email"
            className="block text-xs font-medium text-gray-600"
          >
            E-mail
          </label>
          <div className="relative h-fit mt-2">
            <input
              type="text"
              placeholder="Tapez votre adresse e-mail..."
              className="w-full border px-3 py-2 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={mail}
              onChange={handleChange}
            />
            {visible && (
              <RxCross2
                className="absolute right-3 top-[50%] transform rounded-lg -translate-y-1/2 text-white bg-gray-400 cursor-pointer"
                size={14}
                onClick={handleReset}
              />
            )}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Utilisez une adresse e-mail de votre organisation pour interagir
            facilement avec vos collègues
          </p>
        </form>
        <button className="p-3 bg-[#2383E2] text-white rounded-lg transition w-full my-6">
          Continuer
        </button>

        <p className="text-xs text-gray-500 text-center">
          Les utilisateurs qui vous invitent à un espace de travail peuvent voir
          votre nom et votre photo. En continuant, vous reconnaissez avoir
          compris et accepté les{" "}
          <Link
            href="https://www.notion.so/notion/Terms-and-Privacy-28ffdd083dc3473e9c2da6ec011b58ac"
            className="hover:text-[#2383E2] text-gray-400"
          >
            Conditions générales
          </Link>{" "}
          et la{" "}
          <Link
            href="https://www.notion.so/notion/Terms-and-Privacy-28ffdd083dc3473e9c2da6ec011b58ac"
            className="hover:text-[#2383E2] text-gray-400"
          >
            Politique de confidentialité
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
