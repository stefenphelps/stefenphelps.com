import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'zod';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			publishDate: z.coerce.date(),
			description: z.string(),
			author: z.string(),
			heroImage: image().optional(),
			categories: z.array(z.string()).optional()
		})
});

export const collections = { blog };
