import { en } from './locales/en';
import { ja } from './locales/ja';
import { zh } from './locales/zh';
import type { LanguageDescriptor } from './types';

export const LANGUAGE_REGISTRY = {
  zh: {
    label: '中文',
    localeCode: 'zh-CN',
    siteName: '订阅省钱研究所',
    ui: zh,
  },
  en: {
    label: 'English',
    localeCode: 'en',
    siteName: 'Subscription Savings Lab',
    ui: en,
  },
  ja: {
    label: '日本語',
    localeCode: 'ja',
    siteName: 'サブスク節約ラボ',
    ui: ja,
  },
  de: {
    label: 'Deutsch',
    localeCode: 'de',
  },
  fr: {
    label: 'Français',
    localeCode: 'fr',
  },
  es: {
    label: 'Español',
    localeCode: 'es',
  },
  ru: {
    label: 'Русский',
    localeCode: 'ru',
  },
} as const satisfies Record<string, LanguageDescriptor>;

export const DEFAULT_LANG = 'en' as const;
