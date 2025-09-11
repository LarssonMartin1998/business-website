import { useEffect, useState } from 'react';
import { BlogPost, getBlogPosts } from 'api/blog';

type BlogPostsState = 'loading' | 'success' | 'temporary-failure' | 'critical-failure';

interface UseBlogPostsOptions {
  onTemporaryFailure?: () => void;
  onCriticalFailure?: () => void;
}

interface UseBlogPostsReturn {
  posts: BlogPost[];
  state: BlogPostsState;
  refetch: () => void;
}

export function useBlogPosts(options: UseBlogPostsOptions = {}): UseBlogPostsReturn {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [state, setState] = useState<BlogPostsState>('loading');
  const [refetchCount, setRefetchCount] = useState(0);

  const { onTemporaryFailure, onCriticalFailure } = options;
  const refetch = () => setRefetchCount(prev => prev + 1);

  useEffect(() => {
    const fetchPosts = async () => {
      setState('loading');
      const result = await getBlogPosts();

      switch (result.state) {
        case 'success':
        case 'success-cached':
          setPosts(result.data ?? []);
          setState('success');
          break;
        case 'temporary-failure':
          setPosts([]);
          setState('temporary-failure');
          onTemporaryFailure?.();
          break;
        case 'critical-failure':
          setPosts([]);
          setState('critical-failure');
          onCriticalFailure?.();
          break;
      }
    };
    fetchPosts();
  }, [refetchCount, onTemporaryFailure, onCriticalFailure]);

  return { posts, state, refetch };
}
