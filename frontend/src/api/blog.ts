import { z } from 'zod';
const BlogPostSchema = z.object({
  id: z.number(),
  content: z.string(),
  tags: z.string(),
  published_at: z.string().transform(str => new Date(str)),
  updated_at: z.string().transform(str => new Date(str)),
});
type BlogPost = z.infer<typeof BlogPostSchema>;

const BlogPostsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(BlogPostSchema),
});

type ResultState = 'success' | 'temporary-failure' | 'critical-failure';
type APIResult<T> = {
  state: ResultState;
  data?: T;
};

// THIS is not a concern right now, and might not be ever. However, this can be expanded to:
// - Quickly check if DB has changed, otherwise JUST cache results
// - Fetch only what we need ATM, meaning, dont fetch all posts for landing page.
// - If user choose to enter blog page, load first and second pager sections, as the user changes page,
// load and cache the next one and slowly build up a complete picture.
//
// ^ This is a good idea, but too much to focus on now, this is even good enough to ship for my usecase.
async function getBlogPosts(): Promise<APIResult<BlogPost[]>> {
  let response: Response;

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  try {
    response = await fetch(`${API_BASE_URL}/api/v1/posts`);
  } catch {
    return { state: 'temporary-failure', data: undefined };
  }

  if (!response.ok) {
    return { state: 'temporary-failure', data: undefined };
  }

  let raw: unknown;
  try {
    raw = await response.json();
  } catch {
    return { state: 'critical-failure', data: undefined };
  }

  try {
    const parsed = BlogPostsResponseSchema.parse(raw);
    if (!parsed.success) {
      return { state: 'critical-failure', data: undefined };
    }
    return { state: 'success', data: parsed.data };
  } catch {
    return { state: 'critical-failure', data: undefined };
  }
}

export { getBlogPosts };
export type { BlogPost };
