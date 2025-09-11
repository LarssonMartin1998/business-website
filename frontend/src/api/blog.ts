import { z } from 'zod';

import { APIResult } from 'api/types';

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

var cache: Cache = {
  blogPosts: null,
  createdAt: Date.now(),
};

type Cache = {
  blogPosts: BlogPost[] | null;
  createdAt: number;
};

function isCacheDirty(): boolean {
  if (cache.blogPosts == null) {
    return true;
  }

  const maxLegalAgeMS = 60 * 10 * 1000; // 10 minutes
  if (Date.now() > cache.createdAt + maxLegalAgeMS) {
    return true;
  }

  return false;
}

async function getBlogPosts(): Promise<APIResult<BlogPost[]>> {
  let response: Response;

  if (!isCacheDirty()) {
    return { state: 'success-cached', data: cache.blogPosts as BlogPost[] };
  }

  try {
    response = await fetch('/api/v1/posts');
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

    cache = {
      blogPosts: parsed.data,
      createdAt: Date.now(),
    };

    return { state: 'success', data: parsed.data };
  } catch {
    return { state: 'critical-failure', data: undefined };
  }
}

export { getBlogPosts };
export type { BlogPost };
