import { useEffect, useLayoutEffect, useRef, useState, } from 'react';
import { flushSync } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { BlogPost, } from 'api/blog';
import { extractBread, extractHeader } from 'utils/helpers';
import { useBlogPosts } from 'hooks/useBlogPosts';
import { border, hover, peerHoverRaw, raw, text } from 'design-system/colors';

import Header from 'components/Header';
import Main from 'components/Main';
import { CardDefault } from 'components/Card';
import { ButtonAccent } from 'components/Button';
import BlogMeta from 'components/BlogMeta';
import Footer from 'components/Footer';
import MainHeading from 'components/MainHeading';
import StyledMarkdown from 'components/StyledMarkdown';

interface BlogEntryProps {
  blogPost: BlogPost;
  expanded: boolean;
  onToggle: () => void;
}

const SCROLL_TOP_OFFSET = 16;

function postElementId(id: number): string {
  return `post-${id}`;
}

function parsePostFragment(hash: string): number | null {
  const match = /^#post-(\d+)$/.exec(hash); // pattern mirrors postElementId: '#post-{id}'
  return match ? parseInt(match[1], 10) : null;
}

function scrollToPost(element: HTMLElement): void {
  const top = element.getBoundingClientRect().top + window.scrollY - SCROLL_TOP_OFFSET;
  window.scrollTo({ top, behavior: 'instant' });
}

function BlogEntry({ blogPost, expanded, onToggle }: BlogEntryProps) {
  const postTitle = extractHeader(blogPost.content);
  const postBread = extractBread(blogPost.content);

  return (
    <CardDefault as={'article'} id={postElementId(blogPost.id)} className={twMerge(
      'p-0 rounded-xl shadow-md/10',
      !expanded && hover(border(raw.emberBark))
    )}>
      <button
        onClick={onToggle}
        className='peer group w-full p-4 px-4.5 hover:cursor-pointer'
        aria-label={expanded ? `Close blog post ${postTitle}` : `Open blog post ${postTitle}`}
      >
        <BlogMeta applyUnderline={expanded} blogPost={blogPost} />
      </button>

      {expanded && <div className={twMerge(border(raw.graniteGreyLight), peerHoverRaw(border(raw.emberBark)), 'border-dashed border-t-1 px-4.5 py-4')}>
        <StyledMarkdown markdownText={postBread} />
      </div>}
    </CardDefault>
  );
}

function BlogSection() {
  const { posts, state, refetch } = useBlogPosts();
  const location = useLocation();
  const [expandedId, setExpandedId] = useState<number | null>(() => {
    // Hash takes priority: it reflects the current URL the user is actually viewing.
    // Router state is a fallback for navigations from the home page that arrive without a hash.
    const hashId = parsePostFragment(location.hash);
    if (hashId != null) {
      return hashId;
    }

    if (location.state?.expandPostId != null) {
      return location.state.expandPostId as number;
    }

    return null;
  });

  useEffect(() => {
    if (expandedId != null) {
      history.replaceState(null, '', `#${postElementId(expandedId)}`);
    } else {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [expandedId]);

  // Scroll guard for initial page load: true when arriving via URL fragment or router state link.
  // Kept false otherwise so that user-triggered expansions don't trigger the layout effect scroll.
  const needsScrollToPost = useRef(expandedId != null);
  const isFirstHashEffect = useRef(true);

  // When the user navigates to a different post fragment via the URL bar, sync the expanded state
  // and scroll to the post. flushSync renders synchronously so the post is expanded before we
  // measure its position. requestAnimationFrame defers the scroll until after the browser's own
  // native fragment scroll has fired, ensuring our 16px offset is not overridden.
  useEffect(() => {
    if (isFirstHashEffect.current) {
      isFirstHashEffect.current = false;
      return;
    }

    const id = parsePostFragment(location.hash);
    if (id == null) {
      return;
    }

    flushSync(() => setExpandedId(id));
    requestAnimationFrame(() => {
      const element = document.getElementById(postElementId(id));
      if (element) {
        scrollToPost(element);
      }
    });
  }, [location.hash]);

  // Scroll to the initially expanded post once posts finish loading (URL fragment or router state).
  // useLayoutEffect fires synchronously after React commits the DOM and before the browser paints,
  // so the scroll position is set before the user ever sees the page at the wrong position.
  useLayoutEffect(() => {
    if (state !== 'success' || expandedId == null || !needsScrollToPost.current) {
      return;
    }

    const element = document.getElementById(postElementId(expandedId));
    if (!element) {
      return;
    }

    needsScrollToPost.current = false;
    scrollToPost(element);
  }, [state, expandedId]);

  const handleToggle = (id: number) => {
    const wasExpanded = expandedId === id;

    // flushSync forces React to render synchronously so we can measure the settled layout.
    flushSync(() => {
      setExpandedId(prev => prev === id ? null : id);
    });

    // When expanding, scroll the post into view only if its top has shifted above the
    // visible area (e.g. a post above collapsed and pushed this one upward).
    if (!wasExpanded) {
      const element = document.getElementById(postElementId(id));
      if (element && element.getBoundingClientRect().top < SCROLL_TOP_OFFSET) {
        scrollToPost(element);
      }
    }
  };

  if (state === 'critical-failure') {
    return (
      <div className='flex flex-col items-center py-4'>
        <span className='text-red-400 font-bold'>Internal error loading posts.</span>
      </div>
    );
  }

  if (state === 'temporary-failure') {
    return (
      <div className='flex flex-col items-center py-8 gap-y-4'>
        <ButtonAccent aria-label='Refresh blog posts' onClick={refetch}>
          Refresh
        </ButtonAccent>
        <span className={twMerge(text('default'), '')}>Temporary failure when loading posts, please try again.</span>
      </div>
    );
  }

  if (state === 'loading') {
    return (
      <div className='flex justify-center items-center py-4'>
        <span className={text('default')}>Loading posts...</span>
      </div>
    );
  }

  if (state === 'success' && posts.length === 0) {
    return (
      <div className='flex justify-center items-center py-4'>
        <span className={text('default')}>No posts written yet.</span>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-y-4 p-2.5 mt-4'>
      {posts.map((blogPost) => (
        <BlogEntry
          key={blogPost.id}
          blogPost={blogPost}
          expanded={expandedId === blogPost.id}
          onToggle={() => handleToggle(blogPost.id)}
        />
      ))}
    </div>
  );
}

function Blog() {
  const headline = 'Thoughts about Computers, Programming, and Life';
  return (
    <>
      <Header />
      <Main className='flex justify-center px-4'>
        <div className='w-full max-w-4xl mt-4 p-2.5'>
          <MainHeading>{headline}</MainHeading>
          <BlogSection />
        </div>
      </Main>
      <Footer />
    </>
  );
}

export default Blog;
