import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Header from 'components/Header';
import Main from 'components/Main';
import { HeadingDefault, HeadingDefaultCard } from 'components/Heading';
import { BlogPost, getBlogPosts } from 'api/blog';
import { extractHeader, extractBread } from 'utils/helpers';
import { CardDefault } from 'components/Card';
import { twMerge } from 'tailwind-merge';
import { bg, border, groupHoverRaw, raw, text } from 'design-system/colors';

interface BlogEntryProps {
  markdown: string;
}

function NewPostBanner() {
  return (
    <div className={twMerge(bg('alert'), text('alert'), 'min-h-5 flex rounded-full font-bold text-xs px-2.5 w-fit justify-center items-center')}>
      New
    </div>
  );
}

interface PostTagProps {
  children: React.ReactNode;
}

function PostTag({ children }: PostTagProps) {
  return (
    <div className={twMerge(bg(raw.birchWhiteLight), border(raw.graniteGreyLight), 'rounded-full px-2 border-1')}>
      {children}
    </div>
  );
}

function PostMeta() {
  return (
    <div className='flex gap-x-4 text-xs'>
      <span>2025-05-24</span>
      <span>4 min</span>
      <div className='flex gap-x-1'>
        <PostTag>cpp</PostTag >
        <PostTag>meta</PostTag >
        <PostTag>tips</PostTag >
      </div>
    </div>
  );
}

const markdownText = `# This it my Title

Here is some text, wow!

Here is a new line with some **bold** text! That's amazing!

Lets go further, here is some *italic* text, OMG! Are you not entertained?

Here is some code formatting:

\`\`\`cpp
#include <iostream>
int main() {
    std::cout << "Hello World!" << std::endl;
    return 0;
}
\`\`\`

One more thing you can do it so use C++23's \`std::println("Hello World!")\`.
`;

function StyledMarkdown({ text }: { text: string; }) {
  const codeStyle = twMerge(bg(raw.fogGreyLight), border(raw.graniteGrey), 'px-1.5 py-0.5 border-1 text-sm font-mono');

  return (
    <Markdown
      components={{
        // Inline code
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

          // Code blocks with syntax highlighting
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
                  backgroundColor: 'var(--color-fog-grey-light)', // Use your CSS variable
                  border: '1px solid var(--color-granite-grey)', // Use your CSS variable
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          );
        },
        // Remove the pre component since SyntaxHighlighter handles it now
      }}
    >
      {text}
    </Markdown>
  );
}

function BlogEntry({ markdown }: BlogEntryProps) {
  const [show, setShow] = useState(false);
  const extractedHeader = extractHeader(markdown);
  return (
    <CardDefault className='p-4 px-4.5 rounded-xl shadow-md/10'>
      <div className='group min-h-12 flex flex-col gap-y-1 justify-center' onClick={() => setShow(!show)}>
        <div className='flex gap-x-2 items-center'>
          <HeadingDefaultCard className={twMerge(groupHoverRaw(text(raw.firGreen)), 'font-bold group-hover:underline decoration-dashed')} textStr={extractedHeader} size='xs' />
          <NewPostBanner />
        </div>

        <PostMeta />
      </div>

      {show && <div className={twMerge(border(raw.graniteGreyLight), 'mt-4 border-dashed border-t-1 pt-4')}>
        <StyledMarkdown text={extractBread(markdownText)} />
      </div>}
    </CardDefault>
  );
}

function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  useEffect(() => {
    async function fetchLatestPosts() {
      const blogPostsPromise = await getBlogPosts();
      switch (blogPostsPromise.state) {
        case 'success':
          let postsData = blogPostsPromise.data ?? [];
          setPosts(postsData);
          break;
        case 'temporary-failure':
          break;
        case 'critical-failure':
          break;
      }
    }

    fetchLatestPosts();
  }, []);

  const headline = 'Thoughts about Computers, Programming, and Life';
  return (
    <>
      <Header />
      <Main className='flex justify-center'>
        <div className='w-1/2 mt-4 p-2.5'>
          <HeadingDefault className='font-bold' textStr={headline} size='sm' />
          <div className='flex flex-col gap-y-4 p-2.5 mt-4'>
            {posts.map(({ id, content }, _) => (
              <BlogEntry key={id} markdown={content} />
            ))}
          </div>

        </div>
      </Main >
    </>
  );
}

export default Blog;
