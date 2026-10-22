import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { ACTIVITY_MODALITIES, ACTIVITY_TYPES } from "./lib/actividades";

const optionalText = z
  .string()
  .trim()
  .nullish()
  .transform((value) => value || undefined);

const optionalTime = z
  .union([z.literal(""), z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Usá el formato HH:mm")])
  .nullish()
  .transform((value) => value || undefined);

const activityDate = z
  .union([z.string(), z.date()])
  .transform((value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value))
  .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: "Usá el formato YYYY-MM-DD",
  });

const actividades = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/actividades" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      slug: optionalText,
      type: z.enum(ACTIVITY_TYPES),
      date: activityDate,
      time: optionalTime,
      endTime: optionalTime,
      location: optionalText,
      modality: z.enum(ACTIVITY_MODALITIES).default("presencial"),
      summary: z.string().min(1),
      cover: z
        .union([image(), z.literal("")])
        .optional()
        .transform((value) => value || undefined),
      coverAlt: optionalText,
      gallery: z
        .union([image(), z.array(image()), z.literal(""), z.null()])
        .optional()
        .transform((value) => (!value ? [] : Array.isArray(value) ? value : [value])),
      galleryAlts: z.array(z.string().trim()).optional().default([]),
      registrationUrl: optionalText,
      published: z.boolean().default(true),
    }),
});

export const collections = { actividades };
