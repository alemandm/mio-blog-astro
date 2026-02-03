import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
    // Keystatic uses a specific format, but for Astro it's just a collection.
    // We can validate the schema here to match Keystatic's.
    schema: z.object({
        title: z.string(),
    }),
});

export const collections = { posts };
