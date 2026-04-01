export interface UiDictionary {
  home: string;
  blog: string;
  tableOfContents: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDesc: string;
  latestPosts: string;
  noPosts: string;
  allPosts: string;
  footer: string;
  articleBy: string;
  publishedLabel: string;
  updatedLabel: string;
  languageSwitch: string;
}

export interface LanguageDescriptor {
  label: string;
  localeCode: string;
  siteName?: string;
  ui?: UiDictionary;
}
