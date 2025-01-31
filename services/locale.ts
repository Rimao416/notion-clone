'use server';

import { cookies } from 'next/headers';
import { Locale, defaultLocale } from '@/i18n/config';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const cookieStore = await cookies(); // 🔹 Attendre que cookies() résolve la Promise
  return cookieStore.get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies(); // 🔹 Même chose ici
  cookieStore.set(COOKIE_NAME, locale);
}
