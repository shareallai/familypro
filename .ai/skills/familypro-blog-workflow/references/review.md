# Blog Review Workflow

Use this reference when the user asks to review, audit, inspect, or sanity-check a blog post.

## Review posture

- Findings first.
- Prioritize bugs, factual risk, behavioral regressions, stale guidance, broken commands, broken links, and SEO or localization issues.
- Do not lead with a summary.
- Do not rewrite content unless the user asks for edits after the review.

## Review order

1. Fact stability
   - Has anything time-sensitive potentially changed?
   - Are versions, commands, links, or product capabilities stated too absolutely?
2. Operational correctness
   - Are commands plausible and in the right order?
   - Are config paths, files, and auth flows described correctly?
3. Structure and readability
   - Does the `h1 -> h2 -> h3` structure reflect the actual argument?
   - Are any sections thin, duplicated, or mechanically split?
4. Frontmatter and multilingual integrity
   - `locale`, `translationKey`, `title`, `headline`, `description`, `summary`, dates
   - Cross-language consistency without literal translation artifacts
5. SEO basics
   - `title` / `headline` relation
   - clarity and uniqueness of `description`
   - likely canonical/hreflang/structured-data implications if relevant to the change

## Findings format

- Order by severity.
- Use file paths and line numbers.
- Explain the consequence, not just the symptom.
- If no findings are discovered, say so explicitly and mention any residual risk or verification gap.

## Typical issue patterns

- Reader is sent to the wrong config or auth file
- A command path is outdated or no longer canonical
- The article treats a conditional fact as universal
- Multilingual variants drift in meaning or over-translate
- `title` and `h1` no longer describe the same page
