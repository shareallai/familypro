import { DEFAULT_LANG, LANGUAGE_REGISTRY } from './i18n/registry';
import type { UiDictionary } from './i18n/types';

export { DEFAULT_LANG };

export type Lang = string;
type KnownLang = keyof typeof LANGUAGE_REGISTRY;

const knownEntries = Object.entries(LANGUAGE_REGISTRY) as Array<
  [KnownLang, (typeof LANGUAGE_REGISTRY)[KnownLang]]
>;
const fallback = LANGUAGE_REGISTRY[DEFAULT_LANG];

export const KNOWN_LANGS = knownEntries.map(([lang]) => lang);

export function isKnownLang(value: string): value is KnownLang {
  return value in LANGUAGE_REGISTRY;
}

function toFallbackLabel(lang: string): string {
  return lang.toLowerCase() === lang ? lang : lang.toLowerCase();
}

export function getLocaleCode(lang: Lang): string {
  return isKnownLang(lang) ? LANGUAGE_REGISTRY[lang].localeCode : lang;
}

export function getSiteName(lang: Lang): string {
  return isKnownLang(lang) ? LANGUAGE_REGISTRY[lang].siteName : fallback.siteName;
}

export function getLangLabel(lang: Lang): string {
  return isKnownLang(lang) ? LANGUAGE_REGISTRY[lang].label : toFallbackLabel(lang);
}

export function getUi(lang: Lang): UiDictionary {
  return isKnownLang(lang) ? LANGUAGE_REGISTRY[lang].ui : fallback.ui;
}

export function collectSiteLangs(locales: string[]): Lang[] {
  const normalized = locales
    .map((value) => value.trim().toLowerCase())
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
    return '汇总 AI 与流媒体订阅的价格对比、税费与汇率口径、支付方式差异和风控提示，帮助你按统一口径评估年度总成本并选择更稳妥的省钱方案。';
  }
  if (lang === 'ja') {
    return 'AI と動画配信サブスクの料金比較に加え、税金や為替の扱い、決済手段ごとの手数料差、地域別の実質コスト、運用時のリスク管理までを同じ基準で整理し、年間総コストを下げるために必要な判断材料と実行ステップを、初めてでも実践できる形でわかりやすく提供します。';
  }
  return `Regional guides for ${listLabel.toLowerCase()} covering price comparisons, tax and FX context, payment-path tradeoffs, and practical steps to lower annual cost with lower risk.`;
}
