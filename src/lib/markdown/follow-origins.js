export const FOLLOW_ORIGINS = ['https://familypro.io'];

export function normalizeHttpOrigin(value) {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    return parsed.origin;
  } catch {
    return null;
  }
}

export function isFollowAllowed(href, { siteOrigin, followOrigins = FOLLOW_ORIGINS } = {}) {
  const hrefOrigin = normalizeHttpOrigin(href);
  if (!hrefOrigin) {
    return false;
  }

  const allowedOrigins = new Set(followOrigins.map(normalizeHttpOrigin).filter(Boolean));
  const normalizedSiteOrigin = normalizeHttpOrigin(siteOrigin);
  if (normalizedSiteOrigin) {
    allowedOrigins.add(normalizedSiteOrigin);
  }

  return allowedOrigins.has(hrefOrigin);
}

export function getExternalLinkRel(
  href,
  { siteOrigin, followOrigins = FOLLOW_ORIGINS, sponsored = false, noopener = false, noreferrer = false } = {},
) {
  const tokens = [];

  if (!isFollowAllowed(href, { siteOrigin, followOrigins })) {
    tokens.push('nofollow');
  }
  if (sponsored) tokens.push('sponsored');
  if (noopener) tokens.push('noopener');
  if (noreferrer) tokens.push('noreferrer');

  return tokens.join(' ');
}
