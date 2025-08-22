import { useEffect, useRef, useState, } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { BlogPost, } from 'api/blog';
import { extractBread } from 'utils/helpers';
import { useBlogPosts } from 'hooks/useBlogPosts';
import { bg, border, raw, text } from 'design-system/colors';

import Header from 'components/Header';
import Main from 'components/Main';
import { CardDefault } from 'components/Card';
import { ButtonAccent } from 'components/Button';
import BlogMeta from 'components/BlogMeta';
import Footer from 'components/Footer';
import SectionHeading from 'components/home/SectionHeading';

interface BlogEntryProps {
  blogPost: BlogPost
}

function StyledMarkdown({ text }: { text: string; }) {
  const codeStyle = twMerge(bg(raw.fogGreyLight), border(raw.graniteGrey), 'px-1.5 py-0.5 border-1 text-sm font-mono');

  return (
    <Markdown
      components={{
        code: ({ children, className, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          const isInline = !className?.includes('language-');

          if (isInline) {
            return (
              <code className={codeStyle} {...props}>
                {children}
              </code>
            );
          }

          return (
            <div className="my-4">
              <SyntaxHighlighter
                style={gruvboxLight}
                language={match ? match[1] : 'text'}
                PreTag="div"
                showLineNumbers={true}
                customStyle={{
                  margin: 0,
                  // borderRadius: '0.375rem',
                  padding: '0.5rem',
                  backgroundColor: 'var(--color-fog-grey-light)',
                  border: '1px solid var(--color-granite-grey)',
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          );
        },
      }}
    >
      {text}
    </Markdown>
  );
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

  return (
    <CardDefault className='p-4 px-4.5 rounded-xl shadow-md/10'>
      <div ref={entryRef}>
      </div>
      <BlogMeta blogPost={blogPost} onClick={visibilityToggler} />

      {show && <div className={twMerge(border(raw.graniteGreyLight), 'mt-4 border-dashed border-t-1 pt-4')}>
        <StyledMarkdown text={extractBread(blogPost.content)} />
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
        <ButtonAccent onClick={refetch}>
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
      <Main className='flex justify-center'>
        <div className='w-2/5 mt-4 p-2.5'>
          <SectionHeading className={twMerge(text('default'), 'text-xl text-left')}>{headline}</SectionHeading>
          <BlogSection />
        </div>
      </Main >
      <Footer />
    </>
  );
}

export default Blog;
