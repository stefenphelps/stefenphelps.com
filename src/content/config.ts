import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishDate: z.string(),
      description: z.string(),
      author: z.string(),
      heroImage: image().optional(),
      categories: z.array(z.string()).optional(),
    }),
});

export const collections = { blog };
