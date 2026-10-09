import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const entry = z.object({
  source: z.string(),
  entryId: z.string(),
  dateAsWritten: z.string().optional(),
  name: z.string().optional(),
  text: z.string().optional(),
  urls: z.array(z.string()).default([]),
});

const events = defineCollection({
  loader: glob({ pattern: '*.md', base: './data/events' }),
  schema: z.object({
    id: z.string(),
    rowId: z.string(),
    title: z.string().default('(untitled)'),
    dateAsWritten: z.string().optional(),
    year: z.union([z.number(), z.literal('undated')]),
    country: z.string().optional(),
    tags: z.string().optional(),
    actors: z.string().optional(),
    actorNames: z.array(z.string()).default([]),
    dollarFiguresAsWritten: z.string().optional(),
    note: z.string().optional(),
    sourceNames: z.array(z.string()).default([]),
    entries: z.array(entry).default([]),
    filled: z.array(z.object({
      field: z.string(), value: z.string(),
      sourceUrl: z.string().optional(), quote: z.string().optional(),
    })).default([]),
  }),
});

const nkAttacks = defineCollection({
  loader: glob({ pattern: '*.md', base: './data/attacks-on-north-korea' }),
  schema: z.object({
    id: z.string(),
    title: z.string().default('(untitled)'),
    dateAsWritten: z.string().optional(),
    year: z.union([z.number(), z.literal('undated')]),
    source: z.string().optional(),
    sourceEntryId: z.string().optional(),
    victimCountry: z.string().optional(),
    tags: z.string().optional(),
    actors: z.string().optional(),
    text: z.string().optional(),
    urls: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: ['METHODOLOGY.md', 'SOURCES.md', 'CONTRIBUTING.md'], base: './data' }),
  schema: z.object({}).passthrough(),
});

export const collections = { events, 'nk-attacks': nkAttacks, pages };
