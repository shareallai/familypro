# Create / Update Workflow

Use this reference when creating a new post, rewriting an existing one, expanding a draft, or refreshing stale content.

## Workflow

1. Determine the target file set.
   - New post: create the primary language file and any requested language variants.
   - Existing post: inspect current frontmatter, structure, claims, commands, and links before editing.
2. Lock the content identity.
   - Choose the correct `translationKey`.
   - Keep `locale` aligned with the folder.
   - Reuse the slug unless the user explicitly wants a different URL.
3. Set or revise frontmatter early.
   - `title`: search-result-oriented title
   - `headline`: optional visible `h1` when wording should differ slightly from `title`
   - `description` and `summary`: concise, readable, and aligned with the actual article
   - `updatedDate`: update when facts or operational guidance materially changed
4. Outline before drafting.
   - Decide the article argument/order first.
   - Aim for a clear `h1 -> h2 -> h3` shape, but only add `h3` where true substructure exists.
   - If numbered headings help, number by real structure rather than cosmetic sequencing.
5. Write or rewrite freely.
   - Preserve facts and user intent.
   - Improve flow, transitions, and section boundaries when the original structure is weak.
   - Remove fluff, repeated summaries, and generic “AI-sounding” filler.
6. If the article contains commands, links, pricing, versions, or operational steps, verify them.
   - External links should default to `rel="nofollow"`.
   - If you write raw HTML anchors instead of Markdown links, keep `rel="nofollow"` explicit.
7. Build and inspect.

## When rewriting an existing article

- Do not anchor on old sentence order.
- It is acceptable to regroup sections, merge thin sections, or split overloaded sections when that produces a better structure.
- If the article is now aimed at a different user need, update `title`, `headline`, `description`, and `summary` together instead of patching only the body.

## Output quality bar

- The article should read like a deliberate post by a human operator or developer.
- Commands should be copyable.
- The intro should tell the reader what problem the post solves and who it is for.
- The conclusion should close the loop instead of restating the entire article.
