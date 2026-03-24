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
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Mark'),
    service: z.enum(['ChatGPT', 'Grok', 'Netflix', 'Disney+', 'Spotify', 'Duolingo']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    exchangeRateNote: z.string(),
    tableLabels: z.object({
      title: z.string(),
      country: z.string(),
      currency: z.string(),
      price: z.string(),
      usd: z.string(),
      notes: z.string(),
    }),
    priceRows: z.array(
      z.object({
        country: z.string(),
        currency: z.string(),
        officialMonthly: z.string(),
        usdApprox: z.number(),
        notes: z.string().optional(),
      }),
    ),
  }),
});

export const collections = {
  blog,
};
