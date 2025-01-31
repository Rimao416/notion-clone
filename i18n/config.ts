// Extraire les codes de langue principaux (sans les régions)
export const locales = [
  "en", // English
  "ko", // Coréen
  "ja", // Japonais
  "fr", // Français
  "de", // Deutsch (Allemand)
  "es", // Español (Espagnol)
  "pt", // Português (Portugais)
  "fi", // Suomi (Finnois)
  "da", // Dansk (Danois)
  "no", // Norsk (Norvégien)
  "sv", // Svensk (Suédois)
] as const;

// Définir le type Locale
export type Locale = (typeof locales)[number];

// Définir la locale par défaut
export const defaultLocale: Locale = "en";
