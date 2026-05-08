---
name: familypro-blog-illustration-workflow
description: Use when adding, replacing, organizing, captioning, optimizing, or verifying images and illustrations for FamilyPro Astro blog posts, especially assets under public/blog/** referenced from src/content/blog/** markdown.
---

# FamilyPro Blog Illustration Workflow

Use this skill together with `familypro-blog-workflow` whenever a blog task touches images, screenshots, diagrams, or article illustrations.

## Core Rules

- Prefer the image the user provided. Do not redraw, regenerate, convert to SVG, or restyle it unless the user explicitly asks.
- Store article-specific images under `public/blog/{slug}/`.
- Use lowercase, descriptive filenames with hyphens, for example `herosms-openai-thailand-sms.png`.
- Keep original raster format when practical (`.png`, `.jpg`, `.jpeg`, `.webp`). Use SVG only for intentional vector diagrams or when the user asks for SVG.
- Do not place blog images in `src/content/blog/**`, `dist/`, or `.astro/`.
- Add meaningful `alt` text for non-decorative images.
- Add a caption when the image contains prices, UI state, dates, or operational context.
- If the image shows prices, balances, inventory, limits, or UI availability, state the data date or that values are only examples and final state depends on the live page.

## Workflow

1. Identify the blog slug from the content file path.
   - Example: `src/content/blog/zh/chatgpt-codex-phone-verification-sms-guide.md`
   - Asset directory: `public/blog/chatgpt-codex-phone-verification-sms-guide/`
2. Save or copy the provided image into that asset directory.
   - If the user supplied a local image path, copy that exact file.
   - If the image is attached in the conversation and a local cached/downloaded file exists, use that original file.
   - If no file is accessible, ask for a local path or ask the user to place the image in the workspace.
3. Reference the asset from the Markdown file using an HTML `<figure>` when a caption is useful.
4. Keep the path consistent with existing content patterns.
   - From `src/content/blog/zh/{slug}.md`, use `../../../blog/{slug}/{filename}`.
5. Run validation.
   - For any `src/content/blog/**` edit: `npm run sync:updated-date`
   - If the post contains references: `npm run check:references`
   - Always run `npm run build`
   - Inspect generated HTML for the `<img>` path and verify the asset exists in `dist/blog/{slug}/`.

## Figure Pattern

Use this pattern for article screenshots:

```html
<figure>
  <img
    src="../../../blog/{slug}/{filename}.png"
    alt="Specific description of what the screenshot shows."
    style="display:block; width:100%; max-width:520px; height:auto; margin:0 auto; border:1px solid #d1d5db; border-radius:12px; background:#f8fafc;"
  />
  <figcaption>Short caption with context, date, or “final state depends on the live page” where relevant.</figcaption>
</figure>
```

Adjust `max-width` to suit the asset:

- Tall mobile screenshots: usually `420px` to `560px`.
- Wide desktop screenshots: usually `100%` without a narrow max width.
- Small logos/icons: use smaller explicit max widths and concise captions only if needed.

## Verification Checklist

- The image file exists under `public/blog/{slug}/`.
- The article references the image with a path that works after Astro build.
- The generated HTML contains the expected `<img src="...">`.
- The built asset exists under `dist/blog/{slug}/`.
- The image has useful `alt` text.
- The caption does not present live prices or inventory as permanent facts.
