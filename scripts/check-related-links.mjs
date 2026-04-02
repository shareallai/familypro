import fs from 'fs';
import path from 'path';
import { FOLLOW_ORIGINS } from '../src/lib/markdown/follow-origins.js';

const BLOG_ROOT = 'src/content/blog';
const ISSUE_PREFIX = 'References section check failed:';
const FOLLOW_ORIGIN_SET = new Set(
  FOLLOW_ORIGINS.map((origin) => {
    try {
      return new URL(origin).origin;
    } catch {
      return null;
    }
  }).filter(Boolean),
);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function listMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listMarkdownFiles(full));
      continue;
    }
    if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      files.push(full);
    }
  }

  return files.sort();
}

function splitFrontmatter(text) {
  if (!text.startsWith('---\n')) {
    return { frontmatter: '', body: text };
  }
  const end = text.indexOf('\n---\n', 4);
  if (end === -1) {
    return { frontmatter: '', body: text };
  }
  return {
    frontmatter: text.slice(4, end),
    body: text.slice(end + 5),
  };
}

function resolveLocale(frontmatter, file) {
  const localeMatch = frontmatter.match(/^locale:\s*("?)([a-z0-9-]+)\1\s*$/m);
  if (localeMatch?.[2]) {
    return localeMatch[2];
  }

  const pathMatch = file.match(/\/blog\/([^/]+)\//);
  if (pathMatch?.[1]) {
    return pathMatch[1];
  }

  return 'en';
}

function expectedHeading(locale) {
  return locale.toLowerCase().startsWith('zh') ? '官方参考' : 'References';
}

function collectExternalLinks(markdown) {
  const links = [];
  const mdRegex = /(?<!!)\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/g;
  const htmlRegex = /<a\b[^>]*\bhref=(["'])(https?:\/\/[^"']+)\1[^>]*>/gi;

  for (const match of markdown.matchAll(mdRegex)) {
    links.push(match[1]);
  }
  for (const match of markdown.matchAll(htmlRegex)) {
    links.push(match[2]);
  }
  return links;
}

function normalizeLink(url) {
  let out = url.trim();
  if (out.endsWith('/')) {
    out = out.slice(0, -1);
  }
  return out;
}

function uniqueNormalized(urls) {
  return Array.from(new Set(urls.map(normalizeLink)));
}

function lineAt(text, index) {
  return text.slice(0, index).split('\n').length;
}

function collectFollowOriginNofollowIssues(markdown) {
  const issues = [];
  const htmlAnchorRegex = /<a\b[^>]*>/gi;

  for (const match of markdown.matchAll(htmlAnchorRegex)) {
    const tag = match[0];
    const hrefMatch = tag.match(/\bhref=(["'])(https?:\/\/[^"']+)\1/i);
    if (!hrefMatch) {
      continue;
    }

    let origin = null;
    try {
      origin = new URL(hrefMatch[2]).origin;
    } catch {
      origin = null;
    }

    if (!origin || !FOLLOW_ORIGIN_SET.has(origin)) {
      continue;
    }

    const relMatch = tag.match(/\brel=(["'])([^"']*)\1/i);
    if (!relMatch) {
      continue;
    }

    const relTokens = relMatch[2]
      .split(/\s+/)
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);

    if (!relTokens.includes('nofollow')) {
      continue;
    }

    issues.push({
      line: lineAt(markdown, match.index ?? 0),
      message: `link to ${origin} must not include rel="nofollow" because the origin is allowlisted for follow links`,
    });
  }

  return issues;
}

function checkFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const { frontmatter, body } = splitFrontmatter(text);
  const locale = resolveLocale(frontmatter, file);
  const expected = expectedHeading(locale);
  const expectedHeadingText = `## ${expected}`;
  const allLinks = uniqueNormalized(collectExternalLinks(body));
  const issues = collectFollowOriginNofollowIssues(body);

  if (allLinks.length === 0) {
    return issues;
  }

  const expectedRegex = new RegExp(`^##\\s+${escapeRegExp(expected)}\\s*$`, 'gm');
  const headingMatches = Array.from(body.matchAll(expectedRegex));
  const genericRegex = /^##\s+([^\n]+)\s*$/gm;
  const allH2 = Array.from(body.matchAll(genericRegex));

  if (headingMatches.length === 0) {
    const likelyReference = allH2
      .map((m) => m[1].trim())
      .find((value) =>
        ['references', 'sources', 'related links', '官方参考', '参考文档'].includes(value.toLowerCase()),
      );

    issues.push({
      line: 1,
      message: likelyReference
        ? `uses "## ${likelyReference}" but must use "${expectedHeadingText}"`
        : `contains reference links but has no "${expectedHeadingText}" section`,
    });
    return issues;
  }

  if (headingMatches.length > 1) {
    const line = lineAt(body, headingMatches[1].index ?? 0);
    issues.push({
      line,
      message: `contains multiple "${expectedHeadingText}" headings; keep only one final section`,
    });
  }

  const references = headingMatches[headingMatches.length - 1];
  const headingIndex = references.index ?? 0;
  const headingLine = lineAt(body, headingIndex);
  const beforeSection = body.slice(0, headingIndex);
  const afterSection = body.slice(headingIndex + references[0].length);

  if (/^##\s+/m.test(afterSection)) {
    issues.push({
      line: headingLine,
      message: `"${expectedHeadingText}" is not the final h2 section`,
    });
  }

  const linksBeforeSection = uniqueNormalized(collectExternalLinks(beforeSection));
  const linksInRelated = uniqueNormalized(collectExternalLinks(afterSection));
  const missingLinks = linksBeforeSection.filter((url) => !linksInRelated.includes(url));

  if (linksBeforeSection.length > 0 && linksInRelated.length === 0) {
    issues.push({
      line: headingLine,
      message: `"${expectedHeadingText}" exists but does not list any links`,
    });
  }

  if (missingLinks.length > 0) {
    issues.push({
      line: headingLine,
      message: `"${expectedHeadingText}" is missing ${missingLinks.length} referenced link(s): ${missingLinks.join(', ')}`,
    });
  }

  return issues;
}

function run() {
  const files = listMarkdownFiles(BLOG_ROOT);
  const failures = [];

  for (const file of files) {
    const issues = checkFile(file);
    for (const issue of issues) {
      failures.push({ file, ...issue });
    }
  }

  if (failures.length === 0) {
    console.log(`References section check passed (${files.length} files).`);
    return;
  }

  console.error(ISSUE_PREFIX);
  for (const failure of failures) {
    console.error(`- ${failure.file}:${failure.line} ${failure.message}`);
  }
  process.exit(1);
}

run();
