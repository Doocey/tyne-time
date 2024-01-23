import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    url: z.string(),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    categories: z.array(z.string()).optional()
  })
});

export const collections = {
  posts: postsCollection
};
