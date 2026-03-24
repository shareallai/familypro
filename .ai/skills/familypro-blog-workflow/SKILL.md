---
name: familypro-blog-workflow
description: Use when creating, rewriting, expanding, translating, localizing, fact-checking, SEO-polishing, or reviewing blog posts for the familypro Astro multilingual content site.
---

# Familypro Blog Workflow

Use this skill for blog-content work in the `familypro` repo, including:

- Create a new blog post
- Rewrite or expand an existing post
- Translate or localize a post into another language
- Refresh stale facts, commands, links, or positioning
- Review a blog post for factual, structural, SEO, or localization issues
- Adjust frontmatter such as `title`, `headline`, `description`, `summary`, or language variants

## Always read first

Before doing substantive work, align with:

- `AGENT.md`
- `src/content.config.ts`
- The relevant file(s) under `src/content/blog/**`

Read `src/pages/[lang]/blog/[slug].astro` only when the task involves `title`, `headline`, page-level rendering, or article SEO output.

## Choose the mode, then load only the matching reference

- For creating, rewriting, expanding, or refreshing a post: read [create_update.md](references/create_update.md)
- For multilingual translation or localization: read [translate_localize.md](references/translate_localize.md)
- For review-only work: read [review.md](references/review.md)
- For frontmatter, title, headline, or SEO-specific adjustments: read [seo_frontmatter.md](references/seo_frontmatter.md)

You may need more than one reference file, but only load the ones relevant to the current task.

## Core operating rules

- Prefer content-only changes unless the task clearly requires a template or SEO logic change.
- Treat Chinese and other languages as separate writing tasks, not literal sentence mapping.
- Preserve shared facts, product claims, and `translationKey` consistency across languages.
- If facts, commands, links, or product behavior may have changed, verify them before writing.
- If the user asks for review, findings come first; do not silently rewrite content unless asked.

## Validation

- After content changes, run `npm run build`.
- If `title`, `headline`, `description`, canonical, hreflang, or structured data changed, inspect generated output or built HTML.
- If review is requested, validate by citing concrete file paths and line numbers.
