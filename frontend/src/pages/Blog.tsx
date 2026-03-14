import { useEffect, useRef, useState, } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { BlogPost, } from 'api/blog';
import { extractBread, extractHeader } from 'utils/helpers';
import { useBlogPosts } from 'hooks/useBlogPosts';
import { bg, border, hover, peerHoverRaw, raw, text } from 'design-system/colors';

import Header from 'components/Header';
import Main from 'components/Main';
import { CardDefault } from 'components/Card';
import { ButtonAccent } from 'components/Button';
import BlogMeta from 'components/BlogMeta';
import Footer from 'components/Footer';
import MainHeading from 'components/MainHeading';
import StyledMarkdown from 'components/StyledMarkdown';

interface BlogEntryProps {
  blogPost: BlogPost
}


}

function BlogEntry({ blogPost }: BlogEntryProps) {
  const location = useLocation();
  const shouldExpandFromNav = location.state?.expandPostId === blogPost.id;
  const [show, setShow] = useState(shouldExpandFromNav);
  const entryRef = useRef<HTMLDivElement>(null);

  const visibilityToggler = () => { setShow(!show); };

  useEffect(() => {
    if (shouldExpandFromNav && show && entryRef.current) {
      entryRef.current.scrollIntoView({ behavior: 'smooth', });
    }
  }, [show, shouldExpandFromNav]);

  const postTitle = extractHeader(blogPost.content);
  const postBread = extractBread(blogPost.content);

  return (
    <CardDefault as={'article'} className={twMerge(
      'p-0 rounded-xl shadow-md/10',
      !show && hover(border(raw.emberBark))
    )}>
      <button
        onClick={visibilityToggler}
        className='peer group w-full p-4 px-4.5 hover:cursor-pointer'
        aria-label={show ? `Close blog post ${postTitle}` : `Open blog post ${postTitle}`}
      >
        <BlogMeta applyUnderline={show} blogPost={blogPost} />
      </button>

      {show && <div ref={entryRef} className={twMerge(border(raw.graniteGreyLight), peerHoverRaw(border(raw.emberBark)), 'border-dashed border-t-1 px-4.5 py-4')}>
        <StyledMarkdown markdownText={postBread} />
      </div>}
    </CardDefault>
  );
}

function BlogSection() {
  const { posts, state, refetch } = useBlogPosts();

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
      {posts.map((blogPost, _) => (
        <BlogEntry key={blogPost.id} blogPost={blogPost} />
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
