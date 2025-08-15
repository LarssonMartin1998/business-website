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
  blogPost: BlogPost
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

interface PostMetaProps {
  date: Date;
  readTimeMins: number;
  tags: string;
}

function PostMeta({ date, readTimeMins, tags }: PostMetaProps) {
  const splitTags = tags.split(",");
  return (
    <div className='flex gap-x-4 text-xs'>
      <span>{date.toLocaleDateString('sv-SE')}</span>
      <span>{readTimeMins} min</span>
      {splitTags.length > 0 && <div className='flex gap-x-1'>
        {splitTags.map((tag, idx) => (
          <PostTag key={idx}>{tag}</PostTag>
        ))}
      </div>}
    </div>
  );
}

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

function BlogEntry({ blogPost }: BlogEntryProps) {
  const [show, setShow] = useState(false);
  const extractedHeader = extractHeader(blogPost.content);

  const publishedAtTime = blogPost.published_at.getTime();
  const updatedAtTime = blogPost.updated_at.getTime();
  const latestBlogTime = Math.max(publishedAtTime, updatedAtTime);

  const now = new Date();
  const diff = Math.abs(now.getTime() - latestBlogTime);
  const daysSinceBlogDate = Math.floor(diff / (1000 * 60 * 60 * 24));
  const newPostThresholdInDays = 14;
  const shouldMarkPostAsNew = daysSinceBlogDate <= newPostThresholdInDays;

  const readSpeedAvgWordsPerMin = 238;
  const technicalComplexityPunishmentGuess = 0.8;
  const markdownSyntaxRemovalGuess = 0.95;
  const wordCount = blogPost.content.split(' ').length;
  const readingTimeGuess = Math.max(1, Math.round(wordCount / readSpeedAvgWordsPerMin) * technicalComplexityPunishmentGuess * markdownSyntaxRemovalGuess);

  return (
    <CardDefault className='p-4 px-4.5 rounded-xl shadow-md/10'>
      <div className='group min-h-12 flex flex-col gap-y-1 justify-center' onClick={() => setShow(!show)}>
        <div className='flex gap-x-2 items-center'>
          <HeadingDefaultCard className={twMerge(groupHoverRaw(text(raw.firGreen)), 'font-bold group-hover:underline decoration-dashed')} textStr={extractedHeader} size='xs' />
          {shouldMarkPostAsNew && <NewPostBanner />}
        </div>

        <PostMeta date={blogPost.published_at} tags={blogPost.tags} readTimeMins={readingTimeGuess} />
      </div>

      {show && <div className={twMerge(border(raw.graniteGreyLight), 'mt-4 border-dashed border-t-1 pt-4')}>
        <StyledMarkdown text={extractBread(blogPost.content)} />
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
            {posts.map((blogPost, _) => (
              <BlogEntry key={blogPost.id} blogPost={blogPost} />
            ))}
          </div>

        </div>
      </Main >
    </>
  );
}

export default Blog;
