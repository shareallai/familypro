# Translation / Localization Workflow

Use this reference when producing another language version of an article or localizing an existing post.

## Default approach

- Default ordering: Chinese first, then other requested languages.
- Do not translate line by line.
- Re-express the same facts and intent in the target language’s natural editorial style.

## What must stay aligned across languages

- Core facts and claims
- Product names, model names, command names, and configuration keys
- Main SEO keyword family
- CTA and article intent
- `translationKey`

## What may change across languages

- Sentence order
- Paragraph rhythm
- Examples and transitions
- Headline wording
- Section phrasing, if the target language reads better with a different framing

## Title / Headline handling

- Keep `title` and visible `h1` (`headline` when present) highly aligned in meaning.
- Prefer the same core keywords with wording adapted to the language.
- If `headline` is used, it should improve page readability, not drift away from the search intent in `title`.

## Chinese-specific bar

- Chinese output should feel like a native blog draft, not a translation artifact.
- Avoid stiff connectors, stacked buzzwords, and repetitive summary language.
- Prefer direct, concrete phrasing over explanatory padding.

## English and other language bar

- Write for how technical readers in that language scan and trust content.
- Do not preserve Chinese sentence logic if it makes the target language feel translated.
- Keep commands and configuration examples exact even when surrounding prose is localized.
