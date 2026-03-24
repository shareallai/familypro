import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
const localePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    locale: z.string().regex(localePattern, 'locale must use lowercase letters/numbers and optional hyphens'),
    translationKey: z.string(),
    title: z.string(),
    description: z.string(),
    summary: z.string(),
    category: z.string(),
    coverImage: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Mark'),
    service: z.string().default('General'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
};
