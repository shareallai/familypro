# SEO / Frontmatter Notes

Use this reference when adjusting `title`, `headline`, `description`, `summary`, or article structure.

## Frontmatter roles

- `title`: search-result-facing title used in HTML `<title>`, OG, and Twitter tags
- `headline`: optional visible page `h1`
- `description`: search/social summary
- `summary`: on-page short intro block under the article header

## Title and headline rules

- `title` and `headline` should share the same core keywords and meaning.
- Prefer “same core terms, slightly different wording” over total separation.
- `headline` should improve page readability, not represent a different promise.

## Length guidance

- Chinese `title`: 20-32 Han characters, hard cap 40
- English/Japanese `title`: 45-65 characters, hard cap 70
- Chinese `description`: 60-90 Han characters, hard cap 110
- English/Japanese `description`: 120-160 characters, hard cap 180

## Structure guidance

- The page has one template-level `h1`.
- Markdown body should begin at `h2`.
- Aim for a clear `h1 -> h2 -> h3` structure, but only when the article logic supports it.
- Numbered `h2` / `h3` headings are fine when the article is tutorial-like and the numbering reflects the true structure.

## Validation triggers

Inspect built output when changing any of the following:

- `title`
- `headline`
- `description`
- canonical-sensitive page logic
- hreflang-sensitive content availability
- structured-data-relevant article metadata
