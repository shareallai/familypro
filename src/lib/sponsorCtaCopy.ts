export interface SponsorCtaCopy {
  href: string;
  navLabel: string;
  navAriaLabel: string;
  tocTitle: string;
  tocButtonText: string;
  tocAriaLabel: string;
}

const SPONSOR_HREF = 'https://familypro.io?invite=7Dfd94eb';

const EN_COPY: SponsorCtaCopy = {
  href: SPONSOR_HREF,
  navLabel: 'Sponsor',
  navAriaLabel: 'Open FamilyPro to support this site and save on subscriptions',
  tocTitle: 'For lower-cost AI and streaming subscriptions, choose FamilyPro.',
  tocButtonText: 'Click to View Deals',
  tocAriaLabel: 'Open FamilyPro to view lower-cost AI and streaming subscriptions',
};

const ZH_COPY: SponsorCtaCopy = {
  href: SPONSOR_HREF,
  navLabel: '赞助入口',
  navAriaLabel: '打开 FamilyPro，支持本站并查看低价订阅方案',
  tocTitle: '低价订阅AI和流媒体，就用FamilyPro',
  tocButtonText: '点击查看优惠方案',
  tocAriaLabel: '打开 FamilyPro，点击查看低价订阅优惠方案',
};

const JA_COPY: SponsorCtaCopy = {
  href: SPONSOR_HREF,
  navLabel: 'スポンサー',
  navAriaLabel: 'FamilyPro を開いて、このサイトを応援しながらサブスク費用を抑える',
  tocTitle: 'AI と動画配信をお得に契約するなら FamilyPro。',
  tocButtonText: 'クリックして確認',
  tocAriaLabel: 'FamilyPro を開いて低価格の契約プランを確認する',
};

function normalizeLang(lang: string): string {
  return lang.trim().toLowerCase();
}

export function getSponsorCtaCopy(lang: string): SponsorCtaCopy {
  const normalized = normalizeLang(lang);

  if (normalized === 'zh' || normalized.startsWith('zh-')) {
    return ZH_COPY;
  }

  if (normalized === 'ja' || normalized.startsWith('ja-')) {
    return JA_COPY;
  }

  return EN_COPY;
}
