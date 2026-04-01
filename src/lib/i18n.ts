import { DEFAULT_LANG, LANGUAGE_REGISTRY } from './i18n/registry';
import type { LanguageDescriptor, UiDictionary } from './i18n/types';

export { DEFAULT_LANG };

export type Lang = string;
type KnownLang = keyof typeof LANGUAGE_REGISTRY;

const knownEntries = Object.entries(LANGUAGE_REGISTRY) as Array<[KnownLang, LanguageDescriptor]>;
const fallback = LANGUAGE_REGISTRY[DEFAULT_LANG];

function must<T>(value: T | undefined, message: string): T {
  if (value === undefined) {
    throw new Error(message);
  }
  return value;
}

const fallbackUi = must(fallback.ui, `LANGUAGE_REGISTRY.${DEFAULT_LANG}.ui is required`);
const fallbackSiteName = must(fallback.siteName, `LANGUAGE_REGISTRY.${DEFAULT_LANG}.siteName is required`);

function normalizeLang(value: string): string {
  return value.trim().toLowerCase();
}

export function toKnownLang(value: string): KnownLang | undefined {
  const normalized = normalizeLang(value);
  if (!normalized) return undefined;
  if (Object.prototype.hasOwnProperty.call(LANGUAGE_REGISTRY, normalized)) {
    return normalized as KnownLang;
  }
  return undefined;
}

function getRegistryEntry(lang: Lang): LanguageDescriptor | undefined {
  const key = toKnownLang(lang);
  return key ? LANGUAGE_REGISTRY[key] : undefined;
}

export const KNOWN_LANGS = knownEntries.map(([lang]) => lang);

export function isKnownLang(value: string): value is KnownLang {
  return Object.prototype.hasOwnProperty.call(LANGUAGE_REGISTRY, value);
}

function toCanonicalLocaleCode(lang: string): string {
  const normalized = normalizeLang(lang).replaceAll('_', '-');
  if (!normalized) return DEFAULT_LANG;
  try {
    return Intl.getCanonicalLocales(normalized)[0] ?? normalized;
  } catch {
    return normalized;
  }
}

function toFallbackLabel(lang: string): string {
  const canonical = toCanonicalLocaleCode(lang);
  try {
    const displayNames = new Intl.DisplayNames([canonical], { type: 'language' });
    return (
      displayNames.of(canonical) ??
      displayNames.of(canonical.split('-')[0] ?? canonical) ??
      normalizeLang(lang)
    );
  } catch {
    return normalizeLang(lang);
  }
}

export function getLocaleCode(lang: Lang): string {
  const entry = getRegistryEntry(lang);
  return entry?.localeCode ?? toCanonicalLocaleCode(lang);
}

export function getSiteName(lang: Lang): string {
  const entry = getRegistryEntry(lang);
  return entry?.siteName ?? fallbackSiteName;
}

export function getLangLabel(lang: Lang): string {
  const entry = getRegistryEntry(lang);
  return entry?.label ?? toFallbackLabel(lang);
}

export function getUi(lang: Lang): UiDictionary {
  const entry = getRegistryEntry(lang);
  return entry?.ui ?? fallbackUi;
}

export function collectSiteLangs(locales: string[]): Lang[] {
  const normalized = locales
    .map((value) => normalizeLang(value))
    .filter(Boolean);
  const uniq = Array.from(new Set([DEFAULT_LANG, ...normalized]));
  return uniq.sort((a, b) => {
    if (a === DEFAULT_LANG) return -1;
    if (b === DEFAULT_LANG) return 1;
    return a.localeCompare(b);
  });
}

export function buildHomeTitle(lang: Lang, siteName: string): string {
  if (lang === 'zh') {
    return `${siteName} | AI 与流媒体订阅省钱指南`;
  }
  if (lang === 'ja') {
    return `${siteName} | AI・動画配信サブスク料金比較と節約戦略を網羅した完全実践ガイド保存版`;
  }
  return `${siteName} | AI & Streaming Subscription Guides`;
}

export function buildBlogIndexTitle(lang: Lang, siteName: string, listLabel: string): string {
  if (lang === 'zh') {
    return `${listLabel} | AI 与流媒体订阅价格对比和省钱指南`;
  }
  if (lang === 'ja') {
    return `${listLabel} | AI・動画配信サブスクの料金比較、税金、為替、節約戦略を網羅した実践ガイド集`;
  }
  return `AI & Streaming Subscription Blog Posts | ${siteName}`;
}

export function buildBlogIndexDescription(lang: Lang, listLabel: string): string {
  if (lang === 'zh') {
    return '汇总 AI 与流媒体订阅的开通教程、价格对比、地区价差与优惠情报，并持续更新支付与风控提醒，帮助你按统一口径选择更划算的订阅方案。';
  }
  if (lang === 'ja') {
    return 'AI と動画配信サブスクの料金比較に加え、税金や為替の扱い、決済手段ごとの手数料差、地域別の実質コスト、運用時のリスク管理までを同じ基準で整理し、年間総コストを下げるために必要な判断材料と実行ステップを、初めてでも実践できる形でわかりやすく提供します。';
  }
  return `${listLabel} for AI and streaming subscriptions: setup steps, regional price gaps, deal updates, and low-risk ways to cut annual costs.`;
}
