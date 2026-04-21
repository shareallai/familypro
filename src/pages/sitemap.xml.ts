import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { collectSiteLangs } from '../lib/i18n';

export const prerender = true;

function toSitemapDate(value?: Date): string | undefined {
  if (!value) return undefined;
  return value.toISOString().split('T')[0];
}

function maxDate(a?: Date, b?: Date): Date | undefined {
  if (!a) return b;
  if (!b) return a;
  return a.getTime() >= b.getTime() ? a : b;
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

type UrlEntry = {
  loc: string;
  lastmod?: string;
};

function resolveSitemapBase(rawBaseUrl: string): string {
  const normalizedBase = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`;
  if (!import.meta.env.PROD) {
    return normalizedBase;
  }

  const repository = (process.env.GITHUB_REPOSITORY ?? 'shareallai/familypro').trim();
  const [owner, repo] = repository.split('/');
  if (!owner || !repo || repo === `${owner}.github.io`) {
    return normalizedBase;
  }

  return `/${repo}/`;
}

export const GET: APIRoute = async ({ site, url }) => {
  const rawBaseUrl = import.meta.env.BASE_URL;
  const baseUrl = resolveSitemapBase(rawBaseUrl);
  const siteUrl = site ?? new URL(url.origin);

  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const siteLangs = collectSiteLangs(posts.map((post) => post.data.locale));

  const modifiedByLang = new Map<string, Date>();
  let modifiedAll: Date | undefined;

  for (const post of posts) {
    const modifiedAt = post.data.updatedDate ?? post.data.pubDate;
    const lang = post.data.locale;
    const latestForLang = maxDate(modifiedByLang.get(lang), modifiedAt);
    if (latestForLang) {
      modifiedByLang.set(lang, latestForLang);
    }
    modifiedAll = maxDate(modifiedAll, modifiedAt);
  }

  const entries: UrlEntry[] = [];
  const pushEntry = (path: string, lastmod?: Date) => {
    const loc = new URL(path, siteUrl).toString();
    entries.push({
      loc,
      lastmod: toSitemapDate(lastmod),
    });
  };

  pushEntry(baseUrl, modifiedAll);

  for (const lang of siteLangs) {
    const langModified = modifiedByLang.get(lang);
    pushEntry(`${baseUrl}${lang}/`, langModified);
    pushEntry(`${baseUrl}${lang}/blog/`, langModified);
  }

  for (const post of posts) {
    const slug = post.id.split('/').pop() ?? post.id;
    const postModified = post.data.updatedDate ?? post.data.pubDate;
    pushEntry(`${baseUrl}${post.data.locale}/blog/${slug}/`, postModified);
  }

  const xmlItems = entries
    .map(({ loc, lastmod }) => {
      if (lastmod) {
        return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${escapeXml(lastmod)}</lastmod>\n  </url>`;
      }
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlItems}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
